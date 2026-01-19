# 🚀 Supabase Integration - Complete Setup Guide

## Overview
We're integrating Supabase (PostgreSQL) as the database for your Ignitia backend. This will replace the test backend with a real database that can store users, colleges, sponsors, and teams.

## 📋 Prerequisites
- Go installed and working
- Supabase account (free tier is fine)
- Internet connection

## 🎯 Step-by-Step Setup

### Step 1: Create Supabase Project
1. Go to https://supabase.com/
2. Sign up or login
3. Click "New Project"
4. Fill in:
   - **Project name**: `ignitia-backend`
   - **Database password**: Choose a strong password (save it!)
   - **Region**: Select closest to your location
5. Click "Create new project" (takes 1-2 minutes)

### Step 2: Get Database Connection String
1. In your Supabase dashboard, go to **Settings** → **Database**
2. Find the "Connection string" section
3. Copy the **URI** connection string (it looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
   ```
4. Replace `[YOUR-PASSWORD]` with the password you set in Step 1

### Step 3: Update Environment Configuration
1. Open `go-backend/.env` file
2. Replace the `DATABASE_URL` line with your Supabase connection string:
   ```env
   DATABASE_URL=postgresql://postgres:your-actual-password@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
   ```

### Step 4: Test Database Connection
```powershell
cd go-backend
go run test-supabase-connection.go
```

You should see:
- ✅ Database connection successful!
- Database version info
- Table count (probably 0 for new database)

### Step 5: Start Backend with Supabase
```powershell
cd go-backend
./start-with-supabase.ps1
```

Or manually:
```powershell
cd go-backend
go run main.go
```

### Step 6: Verify Everything Works
The backend will automatically:
1. 🔗 Connect to Supabase
2. 📊 Create database tables (users, colleges, sponsors, teams, etc.)
3. 🌱 Seed initial data (colleges list, sample sponsors, team members)
4. 🚀 Start API server on port 3001

Check these endpoints:
- http://localhost:3001/api/health
- http://localhost:3001/api/colleges
- http://localhost:3001/ (welcome page)

### Step 7: Test Signup Flow
1. Make sure frontend is running: `npm run dev`
2. Go to http://localhost:5000/signup
3. Complete the 3-step signup process
4. Check Supabase dashboard to see the new user in the database!

## 🔍 Verification Checklist

- [ ] Supabase project created
- [ ] Database connection string copied
- [ ] `.env` file updated with DATABASE_URL
- [ ] Connection test passes
- [ ] Backend starts without errors
- [ ] Database tables created automatically
- [ ] Sample data seeded (colleges, sponsors, teams)
- [ ] API endpoints responding
- [ ] Frontend signup creates real database records

## 🎉 What You Get

**Real Database Features:**
- ✅ User registration and authentication
- ✅ College management
- ✅ Sponsor listings
- ✅ Team member profiles
- ✅ Admin user detection
- ✅ Data persistence
- ✅ SQL queries and relationships

**Supabase Dashboard:**
- View all your data in real-time
- Run SQL queries
- Monitor database performance
- Set up backups
- Manage user permissions

## 🔧 Troubleshooting

**Connection Issues:**
- Check DATABASE_URL format
- Verify Supabase project is active
- Confirm password is correct
- Try regenerating database password in Supabase

**Migration Errors:**
- Check Supabase dashboard for existing tables
- Look at Go backend logs for specific errors
- Ensure database has proper permissions

**Seed Data Issues:**
- Check if data already exists (seeding skips existing data)
- Look for constraint violations in logs
- Verify foreign key relationships

## 🚀 Next Steps

Once Supabase is integrated:
1. **Test the complete signup flow**
2. **Verify user data in Supabase dashboard**
3. **Test admin login with admin@psit.ac.in**
4. **Explore Supabase features** (real-time, storage, etc.)
5. **Set up production deployment**

## 📞 Need Help?

If you encounter issues:
1. Check the Go backend logs for specific error messages
2. Verify your Supabase project status in the dashboard
3. Test the database connection with `test-supabase-connection.go`
4. Ensure all environment variables are set correctly