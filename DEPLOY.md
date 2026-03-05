# LagnManch - Deployment Guide

## 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Once your project is created, go to **SQL Editor** in the Supabase dashboard.
3. Copy the contents of `supabase/schema.sql` and run it in the SQL editor.
   This creates the `profiles` table, indexes, RLS policies, and the `profile-photos` storage bucket.
4. From your Supabase project **Settings > API**, note down:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon (public) key**
   - **service_role key** (keep this secret)

## 2. Local Development

```bash
# Install dependencies
npm install

# Create .env.local from the template
cp .env.local.example .env.local

# Fill in your Supabase credentials in .env.local:
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
# ADMIN_PASSWORD=choose-a-secure-password

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 3. Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Push your code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and import your repository.
3. In the project settings, add these **Environment Variables**:

   | Variable | Value |
   |----------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |
   | `ADMIN_PASSWORD` | Your chosen admin password |

4. Click **Deploy**.

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add ADMIN_PASSWORD

# Redeploy with env vars
vercel --prod
```

## 4. Post-Deployment

- Visit `/admin` to access the admin panel with your chosen password.
- Submitted profiles will have a `pending` status until approved via the admin panel.
- Approved profiles will appear on the `/browse` page.

## 5. Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── create-profile/page.tsx  # Profile registration form
│   ├── browse/page.tsx          # Browse approved profiles
│   ├── profile/[id]/page.tsx    # Profile detail view
│   ├── about/page.tsx           # About page
│   ├── contact/page.tsx         # Contact page
│   ├── admin/page.tsx           # Admin approval panel
│   └── api/profiles/
│       ├── route.ts             # GET (list) + POST (create)
│       └── [id]/route.ts        # GET (single) + PATCH (status) + DELETE
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ProfileCard.tsx
├── lib/
│   └── supabase.ts              # Supabase client config
└── types/
    └── profile.ts               # TypeScript types
```
