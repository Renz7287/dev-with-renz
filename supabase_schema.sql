-- ============================================================
-- Clarence Portfolio — Supabase Database Schema
-- Run this entire file in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── portfolio_settings ──────────────────────────────────────
-- Stores single-value settings like the summary text
create table if not exists portfolio_settings (
  key   text primary key,
  value text not null default ''
);

insert into portfolio_settings (key, value) values
  ('summary', 'Motivated and detail-oriented college student taking up Information Technology, seeking a Virtual Assistant position. Eager to support clients with administrative tasks, scheduling, and organization while continuously learning and improving skills.')
on conflict (key) do nothing;

-- ── va_projects ─────────────────────────────────────────────
create table if not exists va_projects (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  description text not null default '',
  image_url   text,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

insert into va_projects (title, description, image_url, sort_order) values
  (
    'Task Management Sample',
    'Organized and tracked tasks using a structured spreadsheet with columns for Task Name, Deadline, Priority, and Status. Each task was color-coded by status (In Progress, Pending, Completed, Overdue) to give a quick visual overview of workload and deadlines.',
    null,
    1
  ),
  (
    'Calendar Management Sample',
    'Set up and managed a weekly Google Calendar schedule with recurring time blocks for Team Meetings, Email Management, Client Calls, Project Work, and a Friday Weekly Review — ensuring every working hour had clear purpose and no scheduling conflicts.',
    null,
    2
  ),
  (
    'Email Management Sample',
    'Handled professional email correspondence including responding to availability inquiries, sending follow-up messages, and confirming meeting schedules — all written with a clear, polite, and professional tone.',
    null,
    3
  )
on conflict do nothing;

-- ── tech_projects ───────────────────────────────────────────
create table if not exists tech_projects (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  description text not null default '',
  icon_url    text,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

insert into tech_projects (name, description, icon_url, sort_order) values
  ('Park Track',          'A computer vision-based smart parking system using YOLOv8 to detect vehicle occupancy in real time. Built as a capstone project at WMSU.', null, 1),
  ('LNSC Inventory System','Centralized web platform for LNSC Laptops covering inventory, POS sales, inter-branch transfers, and employee management.', null, 2),
  ('Personal Portfolio',  'A responsive developer portfolio with smooth navigation, project showcases, and a contact form — built to make a lasting impression.', null, 3)
on conflict do nothing;

-- ── simple_lists ─────────────────────────────────────────────
-- Stores all tag/pill lists: va_skills, tech_skills, tools, strengths
create table if not exists simple_lists (
  id         uuid primary key default uuid_generate_v4(),
  category   text not null,  -- 'va_skills' | 'tech_skills' | 'tools' | 'strengths'
  value      text not null,
  sort_order int  not null default 0
);

insert into simple_lists (category, value, sort_order) values
  ('va_skills', 'Calendar Management & Scheduling', 1),
  ('va_skills', 'Email Organization', 2),
  ('va_skills', 'Data Entry & File Management', 3),
  ('va_skills', 'Order Fulfilling', 4),
  ('va_skills', 'Basic Spreadsheet Handling (Excel)', 5),
  ('va_skills', 'Document Creation (Google Docs)', 6),
  ('va_skills', 'Time Management & Organization', 7),
  ('va_skills', 'Communication Skills', 8),
  ('va_skills', 'Willingness to Learn & Adapt', 9),
  ('tech_skills', 'HTML', 1),
  ('tech_skills', 'CSS', 2),
  ('tech_skills', 'Tailwind CSS', 3),
  ('tech_skills', 'Git & GitHub', 4),
  ('tech_skills', 'JavaScript', 5),
  ('tech_skills', 'PHP', 6),
  ('tech_skills', 'Python', 7),
  ('tech_skills', 'MySQL', 8),
  ('tech_skills', 'Django', 9),
  ('tech_skills', 'Figma', 10),
  ('tech_skills', 'React', 11),
  ('tools', 'Google Docs', 1),
  ('tools', 'Google Sheets', 2),
  ('tools', 'Google Drive', 3),
  ('tools', 'MS Excel', 4),
  ('tools', 'Gmail', 5),
  ('strengths', 'Highly organized and detail-oriented', 1),
  ('strengths', 'Reliable and consistent with tasks', 2),
  ('strengths', 'Fast learner with strong willingness to improve', 3),
  ('strengths', 'Able to work independently with minimal supervision', 4)
on conflict do nothing;

-- ── availability ─────────────────────────────────────────────
create table if not exists availability (
  id         uuid primary key default uuid_generate_v4(),
  label      text not null,
  value      text not null,
  sort_order int  not null default 0
);

insert into availability (label, value, sort_order) values
  ('Work Type', 'Full-time or Part-time', 1),
  ('Schedule',  'Flexible', 2),
  ('Location',  'Remote (Philippines)', 3)
on conflict do nothing;

-- ── contacts ─────────────────────────────────────────────────
create table if not exists contacts (
  id         uuid primary key default uuid_generate_v4(),
  label      text not null,
  value      text not null,
  url        text,
  sort_order int  not null default 0
);

insert into contacts (label, value, url, sort_order) values
  ('Email',     'clarencecabrera123@gmail.com',  'mailto:clarencecabrera123@gmail.com',                        1),
  ('LinkedIn',  'clarence-cabrera-148a20223',    'https://www.linkedin.com/in/clarence-cabrera-148a20223/',    2),
  ('Facebook',  'clarencecabrera123',             'https://www.facebook.com/clarencecabrera123',               3),
  ('Instagram', '@renzzzzz28',                   'https://www.instagram.com/renzzzzz28/',                     4),
  ('Location',  'Philippines',                   null,                                                        5)
on conflict do nothing;

-- ============================================================
-- Storage bucket for project images
-- ============================================================
-- Run this separately if it fails (bucket creation):
insert into storage.buckets (id, name, public) values ('project-images', 'project-images', true)
on conflict do nothing;

-- Allow public read of images
create policy if not exists "Public read project images"
  on storage.objects for select
  using (bucket_id = 'project-images');

-- Allow authenticated users to upload/delete images
create policy if not exists "Auth upload project images"
  on storage.objects for insert
  with check (bucket_id = 'project-images' and auth.role() = 'authenticated');

create policy if not exists "Auth delete project images"
  on storage.objects for delete
  using (bucket_id = 'project-images' and auth.role() = 'authenticated');

-- ============================================================
-- Row Level Security
-- ============================================================
alter table portfolio_settings enable row level security;
alter table va_projects        enable row level security;
alter table tech_projects      enable row level security;
alter table simple_lists       enable row level security;
alter table availability       enable row level security;
alter table contacts           enable row level security;

-- Public can read everything
create policy if not exists "Public read settings"     on portfolio_settings for select using (true);
create policy if not exists "Public read va_projects"  on va_projects        for select using (true);
create policy if not exists "Public read tech_projects"on tech_projects      for select using (true);
create policy if not exists "Public read lists"        on simple_lists       for select using (true);
create policy if not exists "Public read availability" on availability       for select using (true);
create policy if not exists "Public read contacts"     on contacts           for select using (true);

-- Only authenticated users (admin) can mutate
create policy if not exists "Auth mutate settings"      on portfolio_settings for all using (auth.role() = 'authenticated');
create policy if not exists "Auth mutate va_projects"   on va_projects        for all using (auth.role() = 'authenticated');
create policy if not exists "Auth mutate tech_projects" on tech_projects      for all using (auth.role() = 'authenticated');
create policy if not exists "Auth mutate lists"         on simple_lists       for all using (auth.role() = 'authenticated');
create policy if not exists "Auth mutate availability"  on availability       for all using (auth.role() = 'authenticated');
create policy if not exists "Auth mutate contacts"      on contacts           for all using (auth.role() = 'authenticated');
