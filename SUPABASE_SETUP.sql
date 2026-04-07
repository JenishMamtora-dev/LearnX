-- ========================================
-- LEARNX SUPABASE SETUP SQL
-- ========================================
-- Copy and paste these SQL commands into your Supabase SQL Editor
-- Go to: https://app.supabase.com -> Your Project -> SQL Editor
-- ========================================

-- 1. CREATE USERS TABLE
-- (Supabase auth.users is automatically created, but we can create a public users table for profile info)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 1.5 CREATE COURSES TABLE (for storing global course content)
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  overview TEXT,
  badge TEXT,
  icon TEXT,
  tech_icons JSONB DEFAULT '[]'::jsonb,
  syllabus JSONB DEFAULT '[]'::jsonb,
  is_live BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. CREATE USER_COURSES TABLE (for tracking enrolled courses)
CREATE TABLE IF NOT EXISTS public.user_courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_name TEXT NOT NULL,
  enrolled_at TIMESTAMP DEFAULT NOW(),
  completed BOOLEAN DEFAULT FALSE,
  progress_percentage INTEGER DEFAULT 0,
  UNIQUE(user_id, course_name)
);

-- 3. CREATE USER_NOTES TABLE (for storing user notes per chapter)
CREATE TABLE IF NOT EXISTS public.user_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_name TEXT NOT NULL,
  chapter_index INTEGER NOT NULL,
  note_content TEXT,
  saved_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, course_name, chapter_index)
);

-- 4. CREATE COURSE_PROGRESS TABLE (for tracking chapter completion)
CREATE TABLE IF NOT EXISTS public.course_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_name TEXT NOT NULL,
  chapter_index INTEGER NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  quiz_score INTEGER,
  UNIQUE(user_id, course_name, chapter_index)
);

-- 5. CREATE QUIZ_RECORDS TABLE (for tracking quiz attempts)
CREATE TABLE IF NOT EXISTS public.quiz_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_name TEXT NOT NULL,
  chapter_index INTEGER NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER,
  attempted_at TIMESTAMP DEFAULT NOW()
);

-- 6. CREATE ACTIVE_SESSIONS TABLE (for tracking which users are accessing which course)
CREATE TABLE IF NOT EXISTS public.active_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_name TEXT NOT NULL,
  started_at TIMESTAMP DEFAULT NOW(),
  last_activity TIMESTAMP DEFAULT NOW()
);

-- ========================================
-- SET UP ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.active_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Anyone can view courses
DROP POLICY IF EXISTS "Public can view courses" ON public.courses;
CREATE POLICY "Public can view courses" ON public.courses
  FOR SELECT USING (true);

-- Allow inserts/updates (simplified for admin script usage, in prod restrict to admin)
DROP POLICY IF EXISTS "Public can insert courses" ON public.courses;
CREATE POLICY "Public can insert courses" ON public.courses
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can update courses" ON public.courses;
CREATE POLICY "Public can update courses" ON public.courses
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public can delete courses" ON public.courses;
CREATE POLICY "Public can delete courses" ON public.courses
  FOR DELETE USING (true);

-- Anyone can view all users (needed for admin panel across browsers)
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
DROP POLICY IF EXISTS "Public can view all users" ON public.users;
CREATE POLICY "Public can view all users" ON public.users
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert own data" ON public.users;
CREATE POLICY "Users can insert own data" ON public.users
  FOR INSERT WITH CHECK (true);  -- Allow inserts (checked by app logic)

DROP POLICY IF EXISTS "Users can update own data" ON public.users;
CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Allow admin to delete any user
DROP POLICY IF EXISTS "Public can delete users" ON public.users;
CREATE POLICY "Public can delete users" ON public.users
  FOR DELETE USING (true);

-- Users can only see their own courses
DROP POLICY IF EXISTS "Users can view own courses" ON public.user_courses;
CREATE POLICY "Users can view own courses" ON public.user_courses
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own courses" ON public.user_courses;
CREATE POLICY "Users can insert own courses" ON public.user_courses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own courses" ON public.user_courses;
CREATE POLICY "Users can update own courses" ON public.user_courses
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can only see their own notes
DROP POLICY IF EXISTS "Users can view own notes" ON public.user_notes;
CREATE POLICY "Users can view own notes" ON public.user_notes
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own notes" ON public.user_notes;
CREATE POLICY "Users can insert own notes" ON public.user_notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own notes" ON public.user_notes;
CREATE POLICY "Users can update own notes" ON public.user_notes
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can only see their own progress
DROP POLICY IF EXISTS "Users can view own progress" ON public.course_progress;
CREATE POLICY "Users can view own progress" ON public.course_progress
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own progress" ON public.course_progress;
CREATE POLICY "Users can insert own progress" ON public.course_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own progress" ON public.course_progress;
CREATE POLICY "Users can update own progress" ON public.course_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can only see their own quiz records
DROP POLICY IF EXISTS "Users can view own quiz records" ON public.quiz_records;
CREATE POLICY "Users can view own quiz records" ON public.quiz_records
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own quiz records" ON public.quiz_records;
CREATE POLICY "Users can insert own quiz records" ON public.quiz_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own quiz records" ON public.quiz_records;
CREATE POLICY "Users can update own quiz records" ON public.quiz_records
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can only see their own notes
DROP POLICY IF EXISTS "Users can view own notes" ON public.user_notes;
CREATE POLICY "Users can view own notes" ON public.user_notes
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own notes" ON public.user_notes;
CREATE POLICY "Users can insert own notes" ON public.user_notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own notes" ON public.user_notes;
CREATE POLICY "Users can update own notes" ON public.user_notes
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can only see their own progress
DROP POLICY IF EXISTS "Users can view own progress" ON public.course_progress;
CREATE POLICY "Users can view own progress" ON public.course_progress
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own progress" ON public.course_progress;
CREATE POLICY "Users can insert own progress" ON public.course_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own progress" ON public.course_progress;
CREATE POLICY "Users can update own progress" ON public.course_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can only see their own quiz records
DROP POLICY IF EXISTS "Users can view own quiz records" ON public.quiz_records;
CREATE POLICY "Users can view own quiz records" ON public.quiz_records
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own quiz records" ON public.quiz_records;
CREATE POLICY "Users can insert own quiz records" ON public.quiz_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Anyone can view all active sessions (needed for admin panel across browsers)
DROP POLICY IF EXISTS "Users can view own sessions" ON public.active_sessions;

DROP POLICY IF EXISTS "Public can view all sessions" ON public.active_sessions;
CREATE POLICY "Public can view all sessions" ON public.active_sessions
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can create their sessions" ON public.active_sessions;
CREATE POLICY "Users can create their sessions" ON public.active_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their sessions" ON public.active_sessions;
CREATE POLICY "Users can update their sessions" ON public.active_sessions
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their sessions" ON public.active_sessions;
CREATE POLICY "Users can delete their sessions" ON public.active_sessions
  FOR DELETE USING (auth.uid() = user_id);

-- ========================================
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- ========================================

CREATE INDEX IF NOT EXISTS idx_user_courses_user_id ON public.user_courses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_courses_course_name ON public.user_courses(course_name);
CREATE INDEX IF NOT EXISTS idx_user_notes_user_id ON public.user_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_user_notes_course ON public.user_notes(course_name);
CREATE INDEX IF NOT EXISTS idx_course_progress_user_id ON public.course_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_course_progress_course ON public.course_progress(course_name);
CREATE INDEX IF NOT EXISTS idx_quiz_records_user_id ON public.quiz_records(user_id);
CREATE INDEX IF NOT EXISTS idx_active_sessions_user_id ON public.active_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_active_sessions_course ON public.active_sessions(course_name);
