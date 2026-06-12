# 🚀 Deployment Guide — MG Creative Labs

## Stack Overview
- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Hosting**: Vercel (recommended)
- **Domain**: mgcreativelabs.com

---

## Step 1: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) → **New project**
2. Name: `mgcreativelabs`, choose your region
3. In SQL Editor → paste the entire `supabase/schema.sql` file → **Run**
4. Go to **Authentication → Providers** → Enable:
   - Email/Password ✅
   - Google OAuth ✅ (add your Google Client ID/Secret)
5. In **Authentication → URL Configuration**:
   - Site URL: `https://mgcreativelabs.com`
   - Redirect URLs: `https://mgcreativelabs.com/auth/callback`
6. Get your keys from **Settings → API**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

---

## Step 2: Deploy to Vercel

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "feat: initial MG Creative Labs launch"
git remote add origin https://github.com/yourusername/mgcreativelabs.git
git push -u origin main

# 2. Import to Vercel
# Go to vercel.com → Import → Select your repo

# 3. Add environment variables in Vercel dashboard:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://mgcreativelabs.com

# 4. Deploy!
```

---

## Step 3: Connect Custom Domain

1. Vercel Dashboard → Domains → Add `mgcreativelabs.com`
2. Add DNS records at your registrar:
   ```
   A    @    76.76.21.21
   CNAME www  cname.vercel-dns.com
   ```
3. SSL is automatic via Vercel

---

## Step 4: Configure Supabase Auth Emails

In Supabase → **Authentication → Email Templates**:
- Customize confirm signup email with your brand
- Set sender: `MG Creative Labs <noreply@mgcreativelabs.com>`
- Connect your own SMTP via Supabase settings (Resend.com recommended)

---

## Step 5: Set Up Storage (for avatars/images)

In Supabase → **Storage → New Bucket**:
- Name: `avatars` → Public: ✅
- Name: `blog-covers` → Public: ✅
- Name: `course-assets` → Public: ✅

Add storage RLS policies:
```sql
-- Allow authenticated users to upload to avatars
CREATE POLICY "Avatar uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Avatars are public" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');
```

---

## Step 6: Performance & Monitoring

```bash
# Add Vercel Analytics
npm install @vercel/analytics

# In layout.tsx add:
import { Analytics } from '@vercel/analytics/react';
# Then add <Analytics /> before </body>
```

---

## Local Development

```bash
git clone https://github.com/yourusername/mgcreativelabs.git
cd mgcreativelabs
npm install
cp .env.local.example .env.local
# Fill in your Supabase credentials
npm run dev
# Open http://localhost:3000
```

---

## CI/CD Pipeline (Auto on Vercel)
- Every push to `main` → auto-deploy to production
- Every PR → preview deployment with unique URL
- Vercel runs `npm run build` and `npm run lint` before deploying
