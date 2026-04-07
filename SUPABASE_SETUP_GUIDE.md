# LearnX Supabase Integration Setup Guide

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Fill in the project details:
   - **Name**: LearnX (or your preferred name)
   - **Organization**: Select or create one
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your location
5. Click "Create new project"

## Step 2: Get Your API Keys

1. Once your project is created, go to **Settings** → **API**
2. You'll see:
   - **Project URL** (SUPABASE_URL)
   - **Anon Public Key** (SUPABASE_ANON_KEY)
3. Copy both keys

## Step 3: Update supabase-config.js

Open `supabase-config.js` and replace the placeholder values:

```javascript
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co'; // Replace with your Project URL
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY'; // Replace with your Anon Key
```

**Example:**
```javascript
const SUPABASE_URL = 'https://abcdef123.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

## Step 4: Create Database Tables

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `SUPABASE_SETUP.sql`
4. Paste it into the SQL Editor
5. Click **Run**

This will create all necessary tables with Row Level Security (RLS) policies.

## Step 5: Enable Authentication Methods

1. Go to **Authentication** → **Providers**
2. Make sure **Email** is enabled (it should be by default)
3. Optionally enable other providers (Google, GitHub, etc.)

To enable email:
1. Go to **Authentication** → **Providers**
2. Click **Email**
3. Toggle **Enable Email Provider**
4. Configure email settings if needed

## Step 6: Configure Authentication Settings

1. Go to **Authentication** → **URL Configuration**
2. Add your site URL under **Site URL**:
   - For development: `http://localhost:5500` (or your local server)
   - For production: `https://yourwebsite.com`
3. Add under **Redirect URLs**:
   - `http://localhost:5500` (for local development)
   - Your production URL

## Step 7: Test the Connection

1. Open your LearnX website
2. Try to **Register** (if you have Register.html with Supabase signup)
3. Try to **Login** with the email and password
4. Go to Supabase Dashboard → **Authentication** → **Users** to verify

## Step 8: Verify Tables Are Working

1. Create a test account
2. Enroll in a course (click on any course)
3. Go to Supabase Dashboard
4. Go to **Table Editor**
5. Check **user_courses** table to see if your enrollment is recorded

---

## Understanding the Tables

### users
- Stores user profile information (name, email, avatar)
- Reference: Supabase auth.users

### user_courses
- Tracks which courses each user is enrolled in
- Stores enrollment date and completion status
- Used in `openReader()` and `saveUserCourse()` functions

### user_notes
- Stores all notes user takes per chapter
- Unique per user + course + chapter
- Updated when `saveNote()` is called

### course_progress
- Tracks which chapters user has completed
- Stores completion date and quiz scores
- Used for progress tracking

### quiz_records
- Records all quiz attempts with scores
- Helps track learning progress over time

---

## Database Operations in Code

### Save a Course Enrollment
```javascript
await saveUserCourse(courseName);
```
This is called when user clicks "Open Course"

### Save User Notes
```javascript
await saveNote();
```
This is called when user types notes

### Load User Notes (Optional - you can implement)
```javascript
const { data } = await supabaseClient
  .from('user_notes')
  .select('*')
  .eq('user_id', activeUser.id)
  .eq('course_name', courseName);
```

---

## Troubleshooting

### Issue: "Supabase is not defined"
- Make sure `supabase-config.js` is loaded BEFORE `index.js`
- Check that you have the Supabase library: `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>`

### Issue: Login not working
- Verify your SUPABASE_URL and SUPABASE_ANON_KEY are correct
- Check browser console (F12 → Console tab) for error messages
- Make sure the user exists in Supabase (go to Authentication → Users)

### Issue: Data not saving to database
- Check Row Level Security (RLS) policies are enabled
- Verify user is logged in before saving
- Check browser console for error messages
- Go to Supabase → Logs to see database errors

### Issue: "Please use the Admin API to create a new user"
- This means you're trying to sign up but don't have signup functionality
- You need to create users via Supabase dashboard or implement a signup feature

---

## Next Steps

1. Implement a **Register/Signup page** to let users create accounts via Supabase auth
2. Add **Load Previous Notes** functionality when user opens a chapter
3. Add **Quiz Scoring** to track progress
4. Create **User Dashboard** showing:
   - Enrolled courses
   - Progress percentage
   - Completed chapters
   - Quiz scores

---

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase Database Docs](https://supabase.com/docs/guides/database)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
