# Admin Panel Setup Guide

## Overview
Your admin panel now tracks which users are currently accessing which courses in real-time.

## Setup Steps

### 1. Update Supabase Database
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor**
4. Copy and paste the SQL from `SUPABASE_SETUP.sql`
5. Execute it to create the new `active_sessions` table and RLS policies

### 2. Admin Login
- **Default Credentials:**
  - Email: `admin`
  - Password: `admin123`
- Update these credentials in `admin1.html` after first login!

### 3. Features

#### User Management
The admin panel now displays:
- **Email**: User's email address
- **Full Name**: User's registered name
- **Active Course**: Which course the user is currently viewing (real-time)
- **Last Active**: When the user last accessed a course
- **Joined**: When the user registered
- **Actions**: Delete button to remove users

#### Real-Time Tracking
- Sessions are tracked automatically when users access courses
- The admin panel refreshes every 5 seconds to show live data
- Sessions are stored in the `active_sessions` table

### 4. How It Works

**When a student:**
1. Logs in → Data saved in `users` table
2. Enrolls in a course → Data saved in `user_courses` table
3. Opens a course → Session tracked in `active_sessions` table

**Admin can see:**
- All registered users and their details
- Which course each user is currently viewing
- When they last accessed the course

### 5. Database Tables

#### `users`
- `id` - User ID (from auth)
- `email` - Email address
- `full_name` - Full name (set during registration)
- `created_at` - Registration date

#### `user_courses`
- `user_id` - User ID
- `course_name` - Course name
- `enrolled_at` - When they enrolled
- `completed` - Completion status
- `progress_percentage` - Course progress

#### `active_sessions`
- `user_id` - User ID
- `course_name` - Currently viewing course
- `started_at` - When they opened the course
- `last_activity` - Last activity timestamp

## Customization

### Change Admin Credentials
Edit `admin1.html` line with:
```javascript
if (e === "admin" && p === "admin123") {
```

Change `"admin"` and `"admin123"` to your preferred credentials.

### Change Refresh Rate
Edit `admin1.html`:
```javascript
setInterval(loadUsersFromSupabase, 5000); // Every 5 seconds
```

Change `5000` to your desired interval in milliseconds.

### Add More Admin Features
You can add new sections to track:
- Quiz attempts via `quiz_records` table
- Course progress via `course_progress` table
- User notes via `user_notes` table

## Troubleshooting

**Admin panel shows no users?**
- Make sure users have registered through the registration page
- Check Supabase dashboard to verify data in `users` table
- Verify RLS policies are properly set

**Active courses not showing?**
- Students must be logged in and click on a course
- Check browser console for errors
- Verify `active_sessions` table exists in Supabase

**Permission denied errors?**
- Check RLS policies are enabled on all tables
- Ensure policies are correctly configured
- You may need to disable RLS temporarily for testing

---

**Note**: This is a development setup. For production, implement proper admin authentication with Supabase Auth!
