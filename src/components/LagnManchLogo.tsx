// Inline SVG React components — no HTTP request, instant render

/** Mandap symbol only (transparent bg) — used in Navbar */
export function MandapIcon({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 90"
      className={className}
      aria-label="LagnManch mandap icon"
    >
      {/* Stage / base */}
      <path d="M 35 77 Q 100 68 165 77" fill="none" stroke="#CDA144" strokeWidth="1" />
      <path d="M 25 82 Q 100 70 175 82 Q 100 76 25 82 Z" fill="#CDA144" />

      {/* Left pillar */}
      <rect x="55" y="38" width="10" height="30" fill="#CDA144" />
      <rect x="52" y="38" width="16" height="4" fill="#CDA144" />
      <rect x="52" y="64" width="16" height="4" fill="#CDA144" />

      {/* Right pillar */}
      <rect x="135" y="38" width="10" height="30" fill="#CDA144" />
      <rect x="132" y="38" width="16" height="4" fill="#CDA144" />
      <rect x="132" y="64" width="16" height="4" fill="#CDA144" />

      {/* Arch fill */}
      <path d="M 100 15 L 50 35 Q 75 55 100 35 Q 125 55 150 35 Z" fill="#8B1826" />

      {/* Arch outline */}
      <path
        d="M 100 10 Q 75 20 48 35 L 52 38 Q 75 25 100 15 Q 125 25 148 38 L 152 35 Q 125 20 100 10 Z"
        fill="#CDA144"
      />

      {/* Arch orbs */}
      <circle cx="100" cy="10" r="4" fill="#CDA144" />
      <circle cx="48" cy="35" r="3" fill="#CDA144" />
      <circle cx="152" cy="35" r="3" fill="#CDA144" />

      {/* Arch curve */}
      <path
        d="M 50 35 Q 75 55 100 35 Q 125 55 150 35"
        fill="none"
        stroke="#CDA144"
        strokeWidth="3"
      />

      {/* Heart */}
      <path
        d="M 100 50 C 100 50 88 40 94 34 C 97 31 100 35 100 37 C 100 35 103 31 106 34 C 112 40 100 50 100 50 Z"
        fill="#8B1826"
      />

      {/* Rings */}
      <g stroke="#CDA144" strokeWidth="3" fill="none">
        <circle cx="92" cy="60" r="9" />
        <circle cx="108" cy="60" r="9" />
      </g>
    </svg>
  );
}

/** Square app icon with maroon bg + mandap + LM text — used for OG / manifest */
export function AppIcon({ size = 120 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width={size} height={size}>
      <defs>
        <linearGradient id="appBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A21E31" />
          <stop offset="100%" stopColor="#6C0E1A" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="24" fill="url(#appBgGrad)" />
      <g transform="translate(15, 12) scale(0.45)">
        <path d="M 35 77 Q 100 68 165 77" fill="none" stroke="#CDA144" strokeWidth="1" />
        <path d="M 25 82 Q 100 70 175 82 Q 100 76 25 82 Z" fill="#CDA144" />
        <rect x="55" y="38" width="10" height="30" fill="#CDA144" />
        <rect x="52" y="38" width="16" height="4" fill="#CDA144" />
        <rect x="52" y="64" width="16" height="4" fill="#CDA144" />
        <rect x="135" y="38" width="10" height="30" fill="#CDA144" />
        <rect x="132" y="38" width="16" height="4" fill="#CDA144" />
        <rect x="132" y="64" width="16" height="4" fill="#CDA144" />
        <path d="M 100 15 L 50 35 Q 75 55 100 35 Q 125 55 150 35 Z" fill="transparent" />
        <path
          d="M 100 10 Q 75 20 48 35 L 52 38 Q 75 25 100 15 Q 125 25 148 38 L 152 35 Q 125 20 100 10 Z"
          fill="#CDA144"
        />
        <circle cx="100" cy="10" r="4" fill="#CDA144" />
        <circle cx="48" cy="35" r="3" fill="#CDA144" />
        <circle cx="152" cy="35" r="3" fill="#CDA144" />
        <path
          d="M 50 35 Q 75 55 100 35 Q 125 55 150 35"
          fill="none"
          stroke="#CDA144"
          strokeWidth="3"
        />
        <path
          d="M 100 50 C 100 50 88 40 94 34 C 97 31 100 35 100 37 C 100 35 103 31 106 34 C 112 40 100 50 100 50 Z"
          fill="#CDA144"
        />
        <g stroke="#CDA144" strokeWidth="3" fill="none">
          <circle cx="92" cy="60" r="9" />
          <circle cx="108" cy="60" r="9" />
        </g>
      </g>
      <text
        x="60"
        y="98"
        fontSize="40"
        fontWeight="bold"
        fontFamily="Times New Roman, serif"
        fill="#CDA144"
        textAnchor="middle"
        letterSpacing="2"
      >
        LM
      </text>
    </svg>
  );
}
