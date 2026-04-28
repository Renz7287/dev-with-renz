# Clarence G. Cabrera — Portfolio

A personal portfolio built with **React 18** + **Tailwind CSS 3**, backed by **Supabase** for authentication, database, and image storage. Features a fully functional admin panel protected by Supabase Auth.

---

## 🚀 Quick Start

```bash
npm install
cp .env.example .env   # then fill in your Supabase keys
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🗄️ Supabase Setup (Step by Step)

### 1. Create a Supabase project
- Go to [supabase.com](https://supabase.com) → New Project
- Choose a name, password, and region (e.g. Southeast Asia)

### 2. Run the database schema
- In your Supabase dashboard, go to **SQL Editor**
- Open `supabase_schema.sql` from this project
- Paste the full contents and click **Run**
- This creates all tables, seed data, RLS policies, and the storage bucket

### 3. Create your admin user
- In Supabase dashboard, go to **Authentication → Users**
- Click **Add User** → **Create new user**
- Enter your email and a strong password
- This is the account you'll use to log into the admin panel

### 4. Get your API keys
- Go to **Project Settings → API**
- Copy **Project URL** and **anon public** key

### 5. Fill in your .env file
```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

### 6. Storage bucket (if not auto-created)
- Go to **Storage** in Supabase dashboard
- Create a bucket named `project-images`
- Set it to **Public**
- The SQL schema handles the RLS policies automatically

---

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── AdminLogin.jsx         # Email + password login form
│   │   ├── AdminPanel.jsx         # Admin modal orchestrator
│   │   ├── AdminSidebar.jsx       # Section navigation
│   │   ├── ImageUploadField.jsx   # Drag-or-click image uploader
│   │   ├── ObjectListAdmin.jsx    # Generic CRUD for Availability & Contacts
│   │   ├── SimpleListAdmin.jsx    # CRUD for Skills, Tools, Strengths
│   │   ├── SummaryAdmin.jsx       # Edit the hero summary text
│   │   ├── TechProjectsAdmin.jsx  # Tech projects with icon upload
│   │   └── VaProjectsAdmin.jsx    # VA projects with image upload
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectCard.jsx        # VaProjectCard + TechProjectCard
│   │   ├── Skills.jsx
│   │   ├── Availability.jsx
│   │   └── Contact.jsx
│   └── ui/
│       └── index.jsx              # Toast, Tabs, Pill, Skeleton, FormField, etc.
├── context/
│   ├── AuthContext.jsx            # Supabase auth session
│   └── PortfolioContext.jsx       # All portfolio data + CRUD actions
├── lib/
│   ├── supabase.js                # Supabase client
│   └── api.js                    # All DB + storage helper functions
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🔐 Admin Panel Features

| Section       | Actions                                    |
|---------------|--------------------------------------------|
| Summary       | Edit the hero description text             |
| VA Projects   | Add / Edit / Delete with image upload      |
| Tech Projects | Add / Edit / Delete with icon/logo upload  |
| VA Skills     | Add / Edit / Delete skill tags             |
| Tech Skills   | Add / Edit / Delete skill tags             |
| Tools         | Add / Edit / Delete tool chips             |
| Strengths     | Add / Edit / Delete strength bullets       |
| Availability  | Add / Edit / Delete availability cards     |
| Contacts      | Add / Edit / Delete contact links          |

---

## ☁️ Deploy to Vercel

1. Push this repo to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Click **Deploy** — Vite is auto-detected

The `vercel.json` handles SPA routing automatically.

---

## 🛠️ Tech Stack

- **React 18** — UI framework
- **Tailwind CSS 3** — Styling
- **Vite 5** — Build tool
- **Supabase** — Auth, PostgreSQL DB, and Storage
- **clsx** — Conditional class names
