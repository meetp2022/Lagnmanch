# LagnaManch - Complete Technical Project Document

> **Single Source of Truth** | Last Updated: March 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Architecture](#3-project-architecture)
4. [Database Schema](#4-database-schema)
5. [Authentication & Authorization](#5-authentication--authorization)
6. [API Reference](#6-api-reference)
7. [Pages & Routes](#7-pages--routes)
8. [Components](#8-components)
9. [Features Implemented](#9-features-implemented)
10. [Internationalization (i18n)](#10-internationalization-i18n)
11. [Email System](#11-email-system)
12. [Mobile App (Android)](#12-mobile-app-android)
13. [Deployment Guide](#13-deployment-guide)
14. [UI/UX Design System](#14-uiux-design-system)
15. [Security Architecture](#15-security-architecture)
16. [Environment Variables Reference](#16-environment-variables-reference)
17. [Development Workflow](#17-development-workflow)
18. [Job Responsibilities & Knowledge Areas](#18-job-responsibilities--knowledge-areas)

---

## 1. Project Overview

### What is LagnaManch?

**LagnaManch** (meaning "Marriage Platform" in Gujarati) is a modern, full-stack matrimonial web and mobile platform purpose-built for the **Kodi Patel** community of South Gujarat, India.

- **Live URL**: [https://lagnamanch.com](https://lagnamanch.com)
- **App ID**: `com.lagnamanch.app`
- **Repository**: Private Git repository

### Problem Statement

The Kodi Patel community lacks a dedicated, modern digital platform for matchmaking. Existing matrimonial sites are generic, expensive, and don't cater to the specific cultural and regional needs of this community. Members still rely on word-of-mouth, community gatherings, or expensive brokers.

### Solution

LagnaManch provides a free, community-specific matrimonial platform with:
- Profile creation with admin verification for safety
- Bilingual interface (English + Gujarati) for accessibility
- Location-based filtering tailored to South Gujarat districts
- Mobile app for broader reach
- Modern, premium UI/UX to build community trust

### Target Audience

- Kodi Patel community members (primarily South Gujarat: Valsad, Navsari, Surat, Daman, Dadra & Nagar Haveli)
- Extended reach: Mumbai, Pune, and diaspora communities
- Age group: 18+ (marriage-seeking individuals and their families)

---

## 2. Tech Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.1.6 | React framework with App Router, SSR, API routes |
| **React** | 19.2.3 | UI component library |
| **React DOM** | 19.2.3 | DOM rendering |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **@tailwindcss/postcss** | 4.x | PostCSS plugin for Tailwind v4 |

### Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Supabase** | - | Backend-as-a-Service (PostgreSQL, Auth, Storage) |
| **@supabase/supabase-js** | 2.98.0 | Supabase JavaScript client SDK |
| **@supabase/ssr** | 0.9.0 | Server-side rendering support with cookie management |
| **Next.js API Routes** | - | RESTful API endpoints (App Router) |

### Email

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Nodemailer** | 8.0.1 | Email sending via SMTP |
| **Gmail SMTP** | - | Email service provider |

### Mobile

| Technology | Version | Purpose |
|-----------|---------|---------|
| **@capacitor/core** | 8.2.0 | Cross-platform native runtime |
| **@capacitor/cli** | 8.2.0 | Capacitor CLI tools |
| **@capacitor/android** | 8.2.0 | Android platform support |
| **Android SDK** | 36 | Target Android platform |
| **Gradle** | 8.14.3 | Android build system |

### Deployment & Analytics

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Vercel** | - | Hosting and CI/CD |
| **@vercel/analytics** | 1.6.1 | Page view and web analytics |

### Development Tools

| Technology | Version | Purpose |
|-----------|---------|---------|
| **ESLint** | 9.x | Code linting |
| **eslint-config-next** | 16.1.6 | Next.js ESLint rules |
| **@types/node** | 20.x | Node.js type definitions |
| **@types/react** | 19.x | React type definitions |
| **@types/nodemailer** | 7.0.11 | Nodemailer type definitions |

---

## 3. Project Architecture

### Directory Structure

```
lagnmanch/
├── src/
│   ├── app/                          # Next.js App Router (pages + API)
│   │   ├── layout.tsx                # Root layout (fonts, providers, analytics)
│   │   ├── page.tsx                  # Home/landing page
│   │   ├── login/page.tsx            # Login page
│   │   ├── register/page.tsx         # Registration page
│   │   ├── dashboard/page.tsx        # User dashboard
│   │   ├── create-profile/page.tsx   # Profile creation form
│   │   ├── edit-profile/page.tsx     # Profile editing form
│   │   ├── browse/page.tsx           # Browse profiles with filters
│   │   ├── profile/[id]/page.tsx     # Individual profile detail
│   │   ├── admin/page.tsx            # Admin moderation panel
│   │   ├── about/page.tsx            # About page
│   │   ├── contact/page.tsx          # Contact page
│   │   ├── privacy/page.tsx          # Privacy policy
│   │   ├── terms/page.tsx            # Terms of service
│   │   ├── safety/page.tsx           # Safety guidelines
│   │   ├── report-misuse/page.tsx    # Misuse reporting form
│   │   ├── auth/callback/route.ts    # OAuth callback handler
│   │   └── api/                      # API routes
│   │       ├── profiles/
│   │       │   ├── route.ts          # GET (list) + POST (create)
│   │       │   ├── me/route.ts       # GET + PUT (own profile)
│   │       │   └── [id]/route.ts     # GET + PATCH + DELETE (by ID)
│   │       ├── send-welcome-email/route.ts
│   │       └── report-misuse/route.ts
│   ├── components/                   # Reusable React components
│   │   ├── AuthProvider.tsx          # Auth context provider
│   │   ├── LanguageProvider.tsx      # i18n context provider
│   │   ├── Navbar.tsx                # Navigation bar
│   │   ├── Footer.tsx                # Site footer
│   │   ├── ProfileCard.tsx           # Profile card for browse grid
│   │   ├── ProfileForm.tsx           # Reusable profile form
│   │   ├── ParticleNetwork.tsx       # Interactive animated background
│   │   ├── SampleProfilesSection.tsx # Blurred profiles showcase
│   │   └── LagnaManchLogo.tsx        # Brand logo component
│   ├── lib/                          # Utility libraries
│   │   ├── supabase/
│   │   │   ├── client.ts             # Browser Supabase client
│   │   │   ├── server.ts             # Server Supabase client (cookies)
│   │   │   ├── admin.ts              # Admin client (service role)
│   │   │   └── middleware.ts         # Session refresh middleware
│   │   ├── email/
│   │   │   ├── transporter.ts        # Nodemailer Gmail config
│   │   │   └── welcome-template.ts   # HTML email template
│   │   ├── i18n/
│   │   │   ├── translations.ts       # Translation registry
│   │   │   ├── en.ts                 # English translations
│   │   │   └── gu.ts                 # Gujarati translations
│   │   ├── locations.ts              # District/taluka mapping + pincode API
│   │   └── supabase.ts              # Re-export (backward compat)
│   └── types/
│       └── profile.ts                # Profile TypeScript interface
├── supabase/                         # Database schema & migrations
│   ├── schema.sql                    # Initial schema (tables, RLS, storage)
│   ├── migration-auth.sql            # Auth integration (user_id, policies)
│   └── migration-location.sql        # Location columns (district, taluka, pincode)
├── android/                          # Capacitor Android project
│   ├── app/                          # Android app module
│   ├── build.gradle                  # Top-level Gradle config
│   ├── variables.gradle              # SDK versions (min 24, target 36)
│   └── gradle/wrapper/               # Gradle wrapper
├── public/                           # Static assets
│   ├── icons/                        # App icons (PWA + Android)
│   ├── images/                       # Static images
│   └── site.webmanifest              # Web app manifest
├── middleware.ts                      # Next.js middleware (auth session refresh)
├── capacitor.config.ts               # Capacitor configuration
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── postcss.config.mjs                # PostCSS + Tailwind config
├── eslint.config.mjs                 # ESLint configuration
├── package.json                      # Dependencies and scripts
├── .env.local.example                # Environment variable template
└── DEPLOY.md                         # Deployment guide
```

### Architecture Pattern

```
┌──────────────────────────────────────────────────────┐
│                    Client (Browser)                   │
│  ┌─────────┐  ┌──────────┐  ┌──────────────────────┐│
│  │ React   │  │ Tailwind  │  │ Canvas (Particles)   ││
│  │ Pages   │  │ CSS v4    │  │ Interactive BG       ││
│  └────┬────┘  └──────────┘  └──────────────────────┘│
│       │                                              │
│  ┌────┴────────────────────────────────────────────┐ │
│  │         Next.js App Router (Client + SSR)        │ │
│  │  AuthProvider | LanguageProvider | Middleware     │ │
│  └────┬────────────────────────────────────────────┘ │
└───────┼──────────────────────────────────────────────┘
        │ HTTP (fetch)
┌───────┼──────────────────────────────────────────────┐
│       ▼        Next.js API Routes (Server)            │
│  ┌─────────────────────────────────────────────────┐ │
│  │  /api/profiles     (CRUD)                        │ │
│  │  /api/profiles/me  (Own profile)                 │ │
│  │  /api/send-welcome-email                         │ │
│  │  /api/report-misuse                              │ │
│  └────┬───────────────────────────┬────────────────┘ │
│       │                           │                   │
│  ┌────▼────┐              ┌───────▼──────┐           │
│  │Supabase │              │  Nodemailer   │           │
│  │ Admin   │              │  Gmail SMTP   │           │
│  │ Client  │              └──────────────┘           │
│  └────┬────┘                                         │
└───────┼──────────────────────────────────────────────┘
        │ PostgreSQL + REST
┌───────┼──────────────────────────────────────────────┐
│       ▼           Supabase (Cloud)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │PostgreSQL│  │   Auth   │  │ Storage (S3)     │   │
│  │ + RLS    │  │ (Email/  │  │ profile-photos   │   │
│  │ profiles │  │ Password)│  │ bucket (public)  │   │
│  └──────────┘  └──────────┘  └──────────────────┘   │
└──────────────────────────────────────────────────────┘
```

### Three Supabase Client Types

| Client | File | Key Used | RLS | Purpose |
|--------|------|----------|-----|---------|
| **Browser** | `lib/supabase/client.ts` | Anon Key | Yes | Client-side operations (auth, reads) |
| **Server** | `lib/supabase/server.ts` | Anon Key | Yes | SSR with cookie-based sessions |
| **Admin** | `lib/supabase/admin.ts` | Service Role Key | Bypassed | API routes (full DB access) |

---

## 4. Database Schema

### Table: `profiles`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Unique profile identifier |
| `user_id` | UUID | FK → auth.users(id), ON DELETE SET NULL | Links profile to auth account |
| `full_name` | TEXT | NOT NULL | Full name of the person |
| `gender` | TEXT | NOT NULL, CHECK (Male/Female) | Gender |
| `date_of_birth` | DATE | NOT NULL | Date of birth |
| `age` | INTEGER | NOT NULL | Auto-calculated from DOB |
| `district` | TEXT | Nullable | District (Valsad, Navsari, etc.) |
| `taluka` | TEXT | Nullable | Taluka/town within district |
| `city` | TEXT | NOT NULL | City (stores taluka for backward compat) |
| `pincode` | TEXT | Nullable | 6-digit postal code |
| `current_location` | TEXT | NOT NULL | Current residential location |
| `education` | TEXT | NOT NULL | Highest education level |
| `field_of_study` | TEXT | Nullable | Field/specialization |
| `occupation` | TEXT | NOT NULL | Current occupation |
| `company_or_business` | TEXT | Nullable | Company name or business |
| `annual_income` | TEXT | Nullable | Income range |
| `family_background` | TEXT | Nullable | Family description |
| `native_village` | TEXT | Nullable | Native village/town |
| `father_occupation` | TEXT | Nullable | Father's occupation |
| `mother_occupation` | TEXT | Nullable | Mother's occupation |
| `siblings_count` | INTEGER | DEFAULT 0 | Number of siblings |
| `preferred_age_min` | INTEGER | Nullable | Preferred partner min age |
| `preferred_age_max` | INTEGER | Nullable | Preferred partner max age |
| `preferred_location` | TEXT | Nullable | Preferred partner location |
| `preferred_education` | TEXT | Nullable | Preferred partner education |
| `phone_number` | TEXT | NOT NULL | Contact phone number |
| `whatsapp_number` | TEXT | Nullable | WhatsApp number |
| `photo_url` | TEXT | Nullable | Supabase Storage photo URL |
| `profile_status` | ENUM | NOT NULL, DEFAULT 'pending' | pending / approved / rejected |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last update (auto-trigger) |

### Custom Types

```sql
CREATE TYPE profile_status AS ENUM ('pending', 'approved', 'rejected');
```

### Indexes

| Index | Column(s) | Purpose |
|-------|-----------|---------|
| `idx_profiles_status` | `profile_status` | Fast filtering by approval status |
| `idx_profiles_gender` | `gender` | Gender-based browse queries |
| `idx_profiles_city` | `city` | City/location filtering |
| `idx_profiles_user_id` | `user_id` | Fast lookup by authenticated user |
| `idx_profiles_district` | `district` | District-based filtering |

### Auto-Update Trigger

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

### Row Level Security (RLS) Policies

| Policy | Operation | Target | Condition |
|--------|-----------|--------|-----------|
| Approved profiles are publicly readable | SELECT | Public (anon + auth) | `profile_status = 'approved'` |
| Users can read their own profile | SELECT | Authenticated | `auth.uid() = user_id` |
| Authenticated users can create a profile | INSERT | Authenticated | `auth.uid() = user_id` |
| Users can update their own profile | UPDATE | Authenticated | `auth.uid() = user_id` |

> **Note**: The Supabase service role key (used in admin client) bypasses all RLS policies. This is used in API routes for admin operations.

### Storage: `profile-photos` Bucket

```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', true);
```

- **Public bucket**: Anyone can read uploaded photos via CDN URL
- **Upload policy**: Anyone can upload (INSERT) to this bucket
- **Read policy**: Profile photos are publicly readable (SELECT)
- **File naming**: `${Date.now()}-${randomId}.${extension}`

### Migration History

| Order | File | Changes |
|-------|------|---------|
| 1 | `schema.sql` | Base table, RLS, storage bucket, indexes |
| 2 | `migration-auth.sql` | Added `user_id` FK, auth-based RLS policies |
| 3 | `migration-location.sql` | Added `district`, `taluka`, `pincode` columns |

---

## 5. Authentication & Authorization

### Auth Flow

```
User Registration:
  /register → supabase.auth.signUp(email, password)
    → Account created in auth.users
    → Welcome email sent (fire-and-forget via /api/send-welcome-email)
    → Redirect to /dashboard?welcome=1

User Login:
  /login → supabase.auth.signInWithPassword(email, password)
    → Session cookie set
    → Redirect to /dashboard (or redirectTo param)

Session Management:
  Every request → middleware.ts → updateSession()
    → Refresh Supabase session via cookies
    → Check protected routes → redirect if unauthenticated
    → Check auth pages → redirect if already authenticated

Sign Out:
  Navbar → supabase.auth.signOut()
    → Clear session cookies
    → Redirect to /
```

### Middleware (Route Protection)

**File**: `src/lib/supabase/middleware.ts`

```
Protected Routes (redirect to /login if not authenticated):
  - /dashboard
  - /create-profile
  - /edit-profile

Auth Routes (redirect to /dashboard if already authenticated):
  - /login
  - /register
```

The middleware also preserves the `redirectTo` query parameter so users return to their intended page after login.

### Admin Authentication

Admin operations use a **header-based password** system (not OAuth):

```
Request Header: x-admin-password: <ADMIN_PASSWORD env var>
```

Used by:
- `PATCH /api/profiles/[id]` — approve/reject profiles
- `DELETE /api/profiles/[id]` — delete profiles

The admin panel (`/admin/page.tsx`) stores the password in component state after initial login and sends it with every API request.

### Authorization Matrix

| Resource | Public | Authenticated User | Admin |
|----------|--------|-------------------|-------|
| Browse approved profiles | Read | Read | Read |
| View own profile (any status) | - | Read | Read |
| Create profile | - | Create (own) | - |
| Edit own profile | - | Update (own) | - |
| Approve/reject profiles | - | - | Update |
| Delete profiles | - | - | Delete |
| Upload photos | Upload | Upload | Upload |

---

## 6. API Reference

### `GET /api/profiles`

**Purpose**: List approved profiles with optional filters.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `status` | string | `"approved"` | Filter by profile status |
| `gender` | string | - | Filter by gender (Male/Female) |
| `city` | string | - | Filter by city (partial match, case-insensitive) |
| `education` | string | - | Filter by education (partial match) |
| `age_min` | number | - | Minimum age filter |
| `age_max` | number | - | Maximum age filter |

**Auth**: None required (public). **Response**: `200 OK` — JSON array of profile objects.

---

### `POST /api/profiles`

**Purpose**: Create a new profile for the authenticated user.

**Auth**: Required (Supabase session cookie).

**Body**: JSON with all profile fields (full_name, gender, date_of_birth, etc.)

**Logic**:
1. Verify authentication via `supabase.auth.getUser()`
2. Check no existing profile for this user (409 if duplicate)
3. Auto-calculate age from date_of_birth (leap-year aware)
4. Insert with `profile_status = 'pending'` and `user_id = auth.uid()`

**Responses**: `201 Created` — profile object | `401 Unauthorized` | `409 Conflict` (duplicate)

---

### `GET /api/profiles/me`

**Purpose**: Get the current user's own profile.

**Auth**: Required. **Response**: `200 OK` — profile object | `404 Not Found` (no profile yet)

---

### `PUT /api/profiles/me`

**Purpose**: Update the current user's profile.

**Auth**: Required.

**Important behavior**: Resets `profile_status` to `"pending"` on every edit (triggers admin re-review).

**Response**: `200 OK` — updated profile object

---

### `GET /api/profiles/[id]`

**Purpose**: Get a single profile by UUID.

**Auth**: None required. **Response**: `200 OK` — profile object

---

### `PATCH /api/profiles/[id]`

**Purpose**: Update profile status (admin moderation).

**Auth**: Admin password in `x-admin-password` header.

**Body**: `{ "profile_status": "approved" | "rejected" | "pending" }`

**Response**: `200 OK` — updated profile object

---

### `DELETE /api/profiles/[id]`

**Purpose**: Permanently delete a profile.

**Auth**: Admin password in `x-admin-password` header.

**Response**: `200 OK` — `{ message: "Profile deleted" }`

---

### `POST /api/send-welcome-email`

**Purpose**: Send welcome email to newly registered user.

**Body**: `{ "email": "user@example.com", "name": "User Name" }`

**Security**: Validates request origin matches host header (production only).

**Response**: `200 OK` — `{ success: true }`

---

### `POST /api/report-misuse`

**Purpose**: Submit a misuse/abuse report.

**Body**:
```json
{
  "name": "Reporter Name",
  "email": "reporter@email.com",
  "reportType": "fake_profile | harassment | scam | inappropriate | other",
  "description": "Detailed description..."
}
```

**Response**: `200 OK` — sends formatted email to admin

---

## 7. Pages & Routes

| Route | Page File | Auth | Description |
|-------|-----------|------|-------------|
| `/` | `app/page.tsx` | Public | Landing page with hero, features, how-it-works, sample profiles |
| `/login` | `app/login/page.tsx` | Guest only | Email/password login form |
| `/register` | `app/register/page.tsx` | Guest only | Registration with age confirmation |
| `/dashboard` | `app/dashboard/page.tsx` | Required | User's profile view with status badge |
| `/create-profile` | `app/create-profile/page.tsx` | Required | Comprehensive profile creation form |
| `/edit-profile` | `app/edit-profile/page.tsx` | Required | Profile editing (pre-populated form) |
| `/browse` | `app/browse/page.tsx` | Public | Browse approved profiles with live filters |
| `/profile/[id]` | `app/profile/[id]/page.tsx` | Public | Detailed profile view |
| `/admin` | `app/admin/page.tsx` | Admin password | Profile moderation panel |
| `/about` | `app/about/page.tsx` | Public | About LagnaManch |
| `/contact` | `app/contact/page.tsx` | Public | Contact information and form |
| `/privacy` | `app/privacy/page.tsx` | Public | Privacy policy |
| `/terms` | `app/terms/page.tsx` | Public | Terms of service |
| `/safety` | `app/safety/page.tsx` | Public | Safety guidelines (8 tips) |
| `/report-misuse` | `app/report-misuse/page.tsx` | Public | Abuse reporting form |
| `/auth/callback` | `app/auth/callback/route.ts` | - | OAuth code exchange handler |

---

## 8. Components

### `AuthProvider.tsx`
**Type**: Context Provider (Client Component)
**Purpose**: Manages Supabase authentication state across the app.
**Provides**: `{ user, loading, error, signOut }` via `useAuth()` hook.
**Behavior**: Listens to `onAuthStateChange` events; gracefully handles missing env vars.

### `LanguageProvider.tsx`
**Type**: Context Provider (Client Component)
**Purpose**: Bilingual UI support (English / Gujarati).
**Provides**: `{ language, setLanguage, t }` via `useTranslation()` hook.
**Persistence**: Saves language preference to `localStorage`.

### `Navbar.tsx`
**Type**: Client Component
**Purpose**: Sticky top navigation bar.
**Features**: Logo, desktop menu, mobile hamburger menu, language toggle (EN/GUJ), auth buttons (Login/Register or Dashboard/Sign Out).

### `Footer.tsx`
**Type**: Server Component
**Purpose**: Four-column footer with quick links, trust/safety links, community section, and copyright.

### `ProfileCard.tsx`
**Type**: Client Component
**Props**: `profile: Profile`
**Purpose**: Displays a profile summary in a card layout (3:4 aspect ratio photo, name, age, gender, city, education, occupation). Used on the browse page grid.

### `ProfileForm.tsx`
**Type**: Client Component
**Props**: `initialData?, onSubmit, submitLabel`
**Purpose**: Reusable form component for both create and edit flows. Contains 8 fieldsets: basic info, location (with pincode auto-lookup via India Post API), education, career, family, partner preferences, contact, and photo upload with preview.

### `ParticleNetwork.tsx`
**Type**: Client Component (Canvas-based)
**Purpose**: Interactive animated background for the hero section.
**Features**:
- Heart-shaped particles floating in gold color (`#d4a843`)
- Dynamic connection lines between nearby hearts
- Mouse hover interaction: hearts within radius glow neon pink (`#ff69b4`), connecting lines brighten
- Responsive particle count (80 desktop / 50 tablet / 30 mobile)
- Respects `prefers-reduced-motion` accessibility setting
- Pauses when tab is hidden (performance optimization)
- Uses `requestAnimationFrame` for smooth 60fps animation
- Zero external dependencies (~5KB)

### `SampleProfilesSection.tsx`
**Type**: Client Component
**Purpose**: Displays blurred sample profiles on the homepage to encourage sign-up. Shows different CTAs based on auth state ("Sign Up Free" vs "Browse Profiles").

### `LagnaManchLogo.tsx`
**Type**: Client Component
**Purpose**: Renders the mandap (wedding stage) SVG icon and "LagnaManch" text in Great Vibes script font.

---

## 9. Features Implemented

### Profile Management (Full CRUD)
- **Create**: Multi-step form with 30+ fields, photo upload to Supabase Storage, auto age calculation
- **Read**: Browse grid with cards, detailed profile view page, personal dashboard
- **Update**: Pre-populated edit form, photo replacement, automatic status reset to "pending"
- **Delete**: Admin-only profile deletion

### Profile Photo Upload
- Client-side upload directly to Supabase Storage (`profile-photos` bucket)
- File naming: `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
- Public CDN URL stored in database
- Photo preview in form before submission

### Browse Profiles with Live Filtering
- Real-time filters: Gender, District, Age Range (min/max)
- Only shows admin-approved profiles
- Responsive grid layout (1/2/3 columns)
- Profile cards with key information at a glance

### Admin Moderation Workflow
```
Profile Created (status: pending)
    ↓
Admin Dashboard → Review Profile Details
    ↓
Approve → status: approved → Profile visible in browse
Reject  → status: rejected → Profile hidden
Delete  → Profile permanently removed
    ↓
User Edits Profile → status reset to pending → Re-review required
```

### Bilingual Interface (English + Gujarati)
- Toggle via navbar button (EN / GUJ)
- Preference persisted in localStorage
- Comprehensive translations covering all pages, forms, and UI elements
- Translation keys organized by section (home, browse, auth, form, admin, dashboard, etc.)

### Interactive Particle Network Background
- Canvas-based animated heart particles on the hero section
- Mouse cursor interaction with hover effects (neon pink glow)
- Connection lines between nearby particles
- Responsive to screen size, accessibility-aware
- Zero-dependency implementation

### Pincode Auto-Lookup
- User enters 6-digit pincode in profile form
- Fetches from India Post API (`api.postalpincode.in`)
- Auto-fills: District, Taluka, Post Office
- Falls back to manual selection if API fails

### Welcome Email System
- Triggered on user registration (fire-and-forget)
- Branded HTML template with maroon/gold theme
- 3-step onboarding guide
- CTA button to create profile

### Misuse Reporting
- Dedicated form at `/report-misuse`
- Report types: Fake Profile, Harassment, Scam, Inappropriate Content, Other
- Email notification to admin with reporter details
- ReplyTo header for easy admin response

### Safety Guidelines
- Dedicated `/safety` page with 8 essential safety tips
- Covers: identity verification, personal info protection, public meetings, scam awareness

### Location System
- District → Taluka hierarchical mapping for South Gujarat
- Supported districts: Valsad, Navsari, Surat, Daman, Dadra & Nagar Haveli, Mumbai, Pune
- Dynamic taluka dropdown based on selected district

---

## 10. Internationalization (i18n)

### Supported Languages

| Code | Language | File |
|------|----------|------|
| `en` | English | `src/lib/i18n/en.ts` |
| `gu` | Gujarati (ગુજરાતી) | `src/lib/i18n/gu.ts` |

### Translation Key Structure

```typescript
{
  home: { hero_title, hero_subtitle, cta_register, ... },
  browse: { title, filter_gender, filter_district, ... },
  auth: { login_title, register_title, email, password, ... },
  form: { basic_info, full_name, gender, date_of_birth, ... },
  admin: { title, pending, approved, rejected, ... },
  dashboard: { title, status_pending, status_approved, ... },
  profile: { title, education, family, contact, ... },
  common: { loading, error, success, save, cancel, ... },
  navbar: { home, browse, about, login, register, ... },
  footer: { quick_links, trust_safety, community, ... },
}
```

### How to Add a New Language

1. Create `src/lib/i18n/{code}.ts` (copy `en.ts` as template)
2. Translate all string values
3. Register in `src/lib/i18n/translations.ts`:
   ```typescript
   import { hi } from './hi';
   export const translations = { en, gu, hi };
   ```
4. Add toggle option in `LanguageProvider.tsx`

---

## 11. Email System

### Transporter Configuration

**File**: `src/lib/email/transporter.ts`

```typescript
// Nodemailer with Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,        // lagnamanch@gmail.com
    pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password (not account password)
  },
});
```

### Welcome Email Template

**File**: `src/lib/email/welcome-template.ts`

- Branded HTML email with inline CSS
- Maroon (#800020) header with gold (#CDA144) accents
- 3-step visual onboarding: Create Profile → Get Verified → Browse Matches
- CTA button linking to `/create-profile`
- Responsive layout (600px max-width)
- Footer with community messaging

### Email Flows

**Registration Welcome Email**:
```
/register → supabase.auth.signUp() → success
  → fetch('/api/send-welcome-email', { email, name })
  → Fire-and-forget (doesn't block registration)
  → API validates email format and origin
  → Sends HTML email via Gmail SMTP
```

**Misuse Report Email**:
```
/report-misuse → submit form
  → fetch('/api/report-misuse', { name, email, reportType, description })
  → Formats HTML email with report details
  → Sends to admin email
  → Sets ReplyTo: reporter's email
  → Subject: "[Report] {type} — from {name}"
```

---

## 12. Mobile App (Android)

### Capacitor Configuration

**File**: `capacitor.config.ts`

```typescript
{
  appId: "com.lagnamanch.app",
  appName: "LagnaManch",
  webDir: "out",
  server: {
    url: "https://lagnamanch.com",  // Loads live site in WebView
    cleartext: false,               // HTTPS only
  },
  android: {
    backgroundColor: "#800020",     // Maroon splash
    allowMixedContent: false,
    buildOptions: { releaseType: "APK" },
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: "#800020",
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
}
```

### Android Build Requirements

| Requirement | Value |
|-------------|-------|
| Min SDK Version | 24 (Android 7.0) |
| Compile SDK Version | 36 |
| Target SDK Version | 36 |
| Gradle Version | 8.14.3 |
| Android Gradle Plugin | 8.13.0 |
| Java Version | 11+ (use Android Studio bundled JBR) |

### Build Commands

**Debug APK** (for testing):
```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
cd android
.\gradlew.bat assembleDebug
# Output: android/app/build/outputs/apk/debug/app-debug.apk
```

**Release AAB** (for Play Store):
```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
cd android
.\gradlew.bat bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab
```

### Signing Key Generation

```bash
keytool -genkey -v \
  -keystore lagnmanch-release.keystore \
  -alias lagnmanch \
  -keyalg RSA -keysize 2048 -validity 10000
```

> **CRITICAL**: Back up the keystore file and passwords. Losing them means you cannot update the app on Play Store.

### Play Store Publishing Checklist

- [ ] Google Play Developer account ($25 one-time fee)
- [ ] Signed release AAB (not APK)
- [ ] App icon: 512x512 PNG
- [ ] Feature graphic: 1024x500 PNG
- [ ] Screenshots: Min 2 phone screenshots (1080x1920)
- [ ] Short description (80 chars max)
- [ ] Full description (4000 chars max)
- [ ] Privacy policy URL: https://lagnamanch.com/privacy
- [ ] Category: Social > Dating
- [ ] Content rating questionnaire: 18+
- [ ] Target audience and content declaration

---

## 13. Deployment Guide

### Vercel Deployment

1. **Connect Repository**: Link GitHub/GitLab repo to Vercel
2. **Framework Preset**: Next.js (auto-detected)
3. **Build Command**: `npm run build` (default)
4. **Output Directory**: `.next` (default)
5. **Environment Variables**: Set all 6 variables (see Section 16)
6. **Domain**: Configure `lagnamanch.com` in Vercel project settings

### Supabase Project Setup

1. Create project at [supabase.com](https://supabase.com)
2. Run migrations in SQL Editor in order:
   - `schema.sql` (base tables, RLS, storage)
   - `migration-auth.sql` (auth integration)
   - `migration-location.sql` (location columns)
3. Enable Email auth provider in Authentication settings
4. Copy project URL, anon key, and service role key

### DNS Configuration

```
Type    Name    Value                   TTL
A       @       76.76.21.21             Auto
CNAME   www     cname.vercel-dns.com    Auto
```

### Post-Deployment Verification

1. Visit https://lagnamanch.com — landing page loads
2. Register a new account — email received
3. Create a profile — photo uploads work
4. Admin panel — login and approve profile
5. Browse — approved profile appears
6. Mobile — app loads the live site

---

## 14. UI/UX Design System

### Color Palette

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| **Maroon** | `#800020` | `--color-maroon` | Primary brand, headers, buttons |
| **Maroon Dark** | `#5c0018` | `--color-maroon-dark` | Hover states, footer |
| **Gold** | `#d4a843` | `--color-gold` | Accents, decorations, particles |
| **Cream** | `#fdf8f0` | `--color-cream` | Light backgrounds |
| **White** | `#ffffff` | - | Cards, content areas |
| **Neon Pink** | `#ff69b4` | - | Particle hover interaction |

### Typography

| Font | Family | Usage |
|------|--------|-------|
| **Geist Sans** | Sans-serif | Primary body text, UI elements |
| **Great Vibes** | Script/Cursive | Logo "LagnaManch" branding only |

### Responsive Breakpoints (Tailwind)

| Breakpoint | Min Width | Columns (Browse Grid) |
|------------|-----------|----------------------|
| Default (Mobile) | 0px | 1 column |
| `sm` | 640px | 2 columns |
| `md` | 768px | 2 columns |
| `lg` | 1024px | 3 columns |

### UI Patterns

- **Cards**: Rounded corners (`rounded-lg`), subtle shadow (`shadow-md`), white background
- **Buttons**: Maroon background, white text, rounded-full, hover darkens
- **Forms**: Labeled inputs with border, focus ring in maroon
- **Loading States**: Spinning circle animation with maroon color
- **Status Badges**: Green (approved), Yellow (pending), Red (rejected)
- **Navigation**: Sticky top bar, transparent to white on scroll
- **Profile Photos**: 3:4 aspect ratio containers with object-cover

---

## 15. Security Architecture

### Data Security

| Layer | Mechanism | Details |
|-------|-----------|---------|
| **Database** | Row Level Security (RLS) | PostgreSQL policies control read/write per user |
| **API** | Auth validation | Every protected endpoint checks `supabase.auth.getUser()` |
| **Admin** | Header password | `x-admin-password` header for admin operations |
| **Transport** | HTTPS | All traffic encrypted; Capacitor `cleartext: false` |
| **Storage** | Public bucket | Photos are CDN-served; no sensitive data in storage |

### Input Validation

- **Email**: Regex validation on registration and email endpoints
- **Age**: Auto-calculated server-side (cannot be faked)
- **Profile status**: Server enforces `pending` on create/edit (user cannot self-approve)
- **Admin password**: Compared against environment variable (not in client code)
- **Origin check**: Welcome email API validates request origin header in production

### Protected vs Public Routes

```
Public:           /, /browse, /about, /contact, /privacy, /terms, /safety, /report-misuse, /profile/[id]
Auth Required:    /dashboard, /create-profile, /edit-profile
Guest Only:       /login, /register (redirects to dashboard if logged in)
Admin Only:       /admin (password-gated in UI, header-gated in API)
```

### Security Best Practices Implemented

- Service role key only used server-side (never exposed to client)
- Supabase anon key is safe for client-side (RLS protects data)
- No sensitive data in localStorage (only language preference)
- Profile status reset on edit prevents users from bypassing moderation
- ON DELETE SET NULL for user_id prevents orphaned auth references
- HTTPS-only for mobile app (no mixed content)

---

## 16. Environment Variables Reference

| Variable | Scope | Required | Description |
|----------|-------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | Yes | Supabase project URL (e.g., `https://xxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + Server | Yes | Supabase anonymous/public key (safe for client) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Yes | Supabase service role key (bypasses RLS — keep secret!) |
| `ADMIN_PASSWORD` | Server only | Yes | Password for admin API operations |
| `GMAIL_USER` | Server only | Yes | Gmail address for sending emails |
| `GMAIL_APP_PASSWORD` | Server only | Yes | Gmail App Password (Settings → Security → App Passwords) |

### Setup Instructions

1. Copy `.env.local.example` to `.env.local`
2. Fill in values from your Supabase project dashboard (Settings → API)
3. Generate Gmail App Password: Google Account → Security → 2-Step Verification → App Passwords
4. Set a strong admin password
5. Add all variables to Vercel project settings for production

---

## 17. Development Workflow

### Local Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd lagnmanch

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase and Gmail credentials

# 4. Set up Supabase database
# Run these SQL files in Supabase SQL Editor (in order):
#   - supabase/schema.sql
#   - supabase/migration-auth.sql
#   - supabase/migration-location.sql

# 5. Start development server
npm run dev
# Open http://localhost:3000
```

### NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server with Turbopack |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

### Git Workflow

```
main (production)
  ↓ Vercel auto-deploys on push to main
  └── feature branches → PR → merge to main
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "strict": true,
    "paths": { "@/*": ["./src/*"] }
  }
}
```

---

## 18. Job Responsibilities & Knowledge Areas

This project demonstrates proficiency in the following areas:

### Full-Stack Web Development
- Built a complete web application from scratch using **Next.js 16** (App Router)
- Implemented both client-side and server-side rendering strategies
- Created RESTful API endpoints with proper error handling and authentication
- Managed state with React Context API (AuthProvider, LanguageProvider)

### Database Design & Management
- Designed a normalized PostgreSQL schema for a real-world domain
- Implemented Row Level Security (RLS) policies for data access control
- Created database indexes for query performance optimization
- Managed schema migrations incrementally (3 migration files)
- Used auto-update triggers for timestamp management

### Authentication & Authorization
- Implemented email/password authentication with Supabase Auth
- Built session management with cookie-based SSR approach
- Created middleware for route protection and session refresh
- Designed multi-level authorization (public, authenticated, admin)

### Cloud Infrastructure & DevOps
- Deployed to Vercel with automatic CI/CD from Git
- Configured Supabase (PostgreSQL, Auth, Storage) as backend
- Managed environment variables across development and production
- Set up custom domain with DNS configuration

### Mobile App Development
- Wrapped web application as Android app using Capacitor
- Configured Android build system (Gradle, SDK versions)
- Generated signed APK/AAB for Google Play Store distribution
- Implemented splash screen and native-feel configurations

### Frontend Engineering
- Built responsive UI with Tailwind CSS v4 (mobile-first approach)
- Created custom interactive canvas animation (ParticleNetwork) with mouse interaction
- Implemented internationalization (i18n) supporting English and Gujarati
- Built reusable component library (9 components)
- Implemented form handling with file upload, validation, and auto-fill (pincode API)

### Backend Engineering
- Designed and implemented 10 API endpoints (CRUD operations)
- Integrated email delivery system with Nodemailer and Gmail SMTP
- Built admin moderation workflow with approval/rejection pipeline
- Implemented profile status management with automatic re-review on edit

### UI/UX Design
- Designed cohesive visual identity (maroon/gold/cream color palette)
- Created interactive animated backgrounds (heart particle network)
- Built accessible interfaces (reduced-motion support, semantic HTML)
- Designed user flows: registration → profile creation → moderation → discovery

### Third-Party API Integration
- Supabase (Auth, Database, Storage — 3 client types)
- India Post Pincode API (location auto-detection)
- Gmail SMTP (transactional emails)
- Vercel Analytics (usage tracking)

### Security
- Implemented Row Level Security at the database level
- Built route protection middleware
- Designed admin authentication system
- Prevented common attacks (status manipulation, unauthorized access)
- Enforced HTTPS-only for mobile app

### Key Technical Decisions & Trade-offs

| Decision | Rationale |
|----------|-----------|
| Next.js App Router over Pages Router | Latest architecture, React Server Components, better performance |
| Supabase over custom backend | Faster development, built-in auth/storage/RLS, PostgreSQL reliability |
| Capacitor over React Native | Reuse existing web codebase, faster time-to-market, single codebase |
| Canvas particles over library | Zero dependencies, custom design, ~5KB vs 50-80KB for tsParticles |
| Header-based admin auth over OAuth | Simple, sufficient for single admin, no additional auth provider needed |
| Gmail SMTP over SendGrid/SES | Free tier sufficient, simpler setup, community project budget |
| Tailwind CSS v4 over CSS Modules | Rapid development, utility-first, consistent design system |

---

## Appendix A: TypeScript Profile Interface

```typescript
export type ProfileStatus = "pending" | "approved" | "rejected";

export interface Profile {
  id: string;
  full_name: string;
  gender: "Male" | "Female";
  date_of_birth: string;
  age: number;
  district: string | null;
  taluka: string | null;
  city: string;
  pincode: string | null;
  current_location: string;
  education: string;
  field_of_study: string | null;
  occupation: string;
  company_or_business: string | null;
  annual_income: string | null;
  family_background: string | null;
  native_village: string | null;
  father_occupation: string | null;
  mother_occupation: string | null;
  siblings_count: number;
  preferred_age_min: number | null;
  preferred_age_max: number | null;
  preferred_location: string | null;
  preferred_education: string | null;
  phone_number: string;
  whatsapp_number: string | null;
  photo_url: string | null;
  profile_status: ProfileStatus;
  created_at: string;
  updated_at: string;
}
```

## Appendix B: District-Taluka Mapping

```typescript
{
  "Valsad": ["Vapi", "Umbergaon", "Pardi", "Kaprada", "Dharampur", "Valsad"],
  "Navsari": ["Navsari", "Gandevi", "Jalalpore", "Chikhli", "Bilimora"],
  "Surat": ["Surat City", "Bardoli", "Mandvi", "Mangrol", "Kamrej", "Olpad"],
  "Daman": ["Daman", "Nani Daman", "Moti Daman"],
  "Dadra & Nagar Haveli": ["Silvassa", "Amli", "Naroli"],
  "Mumbai": ["Mumbai"],
  "Pune": ["Pune"],
  "Other": []
}
```

## Appendix C: SQL Migration Scripts

### Migration 1: Base Schema (`supabase/schema.sql`)
Creates: `profiles` table, `profile_status` enum, indexes, RLS policies, `update_updated_at` trigger, `profile-photos` storage bucket.

### Migration 2: Auth Integration (`supabase/migration-auth.sql`)
Adds: `user_id` column (FK to `auth.users`), replaces open insert policy with authenticated-only policy, adds user update and self-read policies.

### Migration 3: Location Enhancement (`supabase/migration-location.sql`)
Adds: `district`, `taluka`, `pincode` columns, `idx_profiles_district` index.

---

*This document serves as the complete technical reference for the LagnaManch project. It contains all information necessary to understand, recreate, maintain, and extend the platform.*
