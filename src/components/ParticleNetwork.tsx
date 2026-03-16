"use client";

import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

interface ParticleNetworkProps {
  className?: string;
  particleColor?: string;
  lineColor?: string;
  maxLineDistance?: number;
  mouseRadius?: number;
  mouseForce?: number;
}

function drawHeart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number,
  opacity: number,
  color: string
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = opacity;
  ctx.shadowColor = color;
  ctx.shadowBlur = color === "#ff69b4" ? 14 : 6;

  const s = size / 16; // scale factor — heart path is designed at ~16px
  ctx.beginPath();
  ctx.moveTo(0, s * 4);
  ctx.bezierCurveTo(-s * 1, s * 1, -s * 8, s * 2, -s * 8, -s * 3);
  ctx.bezierCurveTo(-s * 8, -s * 8, -s * 4, -s * 10, 0, -s * 6);
  ctx.bezierCurveTo(s * 4, -s * 10, s * 8, -s * 8, s * 8, -s * 3);
  ctx.bezierCurveTo(s * 8, s * 2, s * 1, s * 1, 0, s * 4);
  ctx.closePath();

  ctx.fillStyle = color;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
  ctx.restore();
}

export default function ParticleNetwork({
  className = "",
  particleColor = "#d4a843",
  lineColor = "#d4a843",
  maxLineDistance = 150,
  mouseRadius = 120,
  mouseForce = 0.02,
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);

  const getParticleCount = useCallback(() => {
    if (typeof window === "undefined") return 40;
    const w = window.innerWidth;
    if (w < 768) return 35;
    if (w < 1024) return 55;
    return 80;
  }, []);

  const initParticles = useCallback(
    (width: number, height: number): Particle[] => {
      const count = getParticleCount();
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          size: 8 + Math.random() * 10,
          opacity: 0.3 + Math.random() * 0.4,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.008,
        });
      }
      return particles;
    },
    [getParticleCount]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w, h };
    };

    let { w, h } = updateSize();
    particlesRef.current = initParticles(w, h);

    // Draw one static frame for reduced motion
    if (prefersReducedMotion) {
      const particles = particlesRef.current;
      ctx.clearRect(0, 0, w, h);
      // Draw lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxLineDistance) {
            const alpha = 0.25 * (1 - dist / maxLineDistance);
            ctx.strokeStyle = `rgba(212, 168, 67, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      // Draw hearts
      for (const p of particles) {
        drawHeart(ctx, p.x, p.y, p.size, p.rotation, p.opacity, particleColor);
      }
      return; // No animation loop
    }

    // Mouse/touch tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("touchmove", handleTouchMove, { passive: true });
    parent.addEventListener("mouseleave", handleMouseLeave);

    // Visibility change
    const handleVisibility = () => {
      pausedRef.current = document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Resize observer
    const observer = new ResizeObserver(() => {
      const dims = updateSize();
      w = dims.w;
      h = dims.h;
      // Reinit if count bracket changed
      const newCount = getParticleCount();
      if (particlesRef.current.length !== newCount) {
        particlesRef.current = initParticles(w, h);
      }
    });
    observer.observe(parent);

    // Animation loop
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      if (pausedRef.current) return;

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      ctx.clearRect(0, 0, w, h);

      // Update positions
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Wrap edges
        if (p.x < -20) p.x = w + 20;
        else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        else if (p.y > h + 20) p.y = -20;

        // Mouse repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius && dist > 0) {
            const force = mouseForce * (1 - dist / mouseRadius);
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Clamp velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5;
          p.vy = (p.vy / speed) * 1.5;
        }

        // Damping to settle back to gentle drift
        p.vx *= 0.999;
        p.vy *= 0.999;
      }

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxLineDistance) {
            let alpha = 0.25 * (1 - dist / maxLineDistance);
            let lineWidth = 0.8;
            let lineR = 212, lineG = 168, lineB = 67; // gold

            // Brighten near cursor — lines glow pink
            if (mouse.active) {
              const mx = (particles[i].x + particles[j].x) / 2 - mouse.x;
              const my = (particles[i].y + particles[j].y) / 2 - mouse.y;
              const mDist = Math.sqrt(mx * mx + my * my);
              if (mDist < mouseRadius * 1.5) {
                alpha *= 2.5;
                lineWidth = 1.2;
                lineR = 255; lineG = 105; lineB = 180; // neon pink
              }
            }

            ctx.strokeStyle = `rgba(${lineR}, ${lineG}, ${lineB}, ${alpha})`;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw hearts — glow neon pink when near cursor
      for (const p of particles) {
        let color = particleColor;
        let glowOpacity = p.opacity;
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius) {
            const proximity = 1 - dist / mouseRadius;
            color = "#ff69b4"; // neon pink
            glowOpacity = Math.min(1, p.opacity + proximity * 0.5);
          }
        }
        drawHeart(ctx, p.x, p.y, p.size, p.rotation, glowOpacity, color);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("touchmove", handleTouchMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [
    initParticles,
    getParticleCount,
    particleColor,
    lineColor,
    maxLineDistance,
    mouseRadius,
    mouseForce,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ pointerEvents: "none" }}
    />
  );
}
