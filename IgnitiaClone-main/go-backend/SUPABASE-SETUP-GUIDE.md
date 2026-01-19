# Supabase Database Integration Guide

## Step 1: Create Supabase Project

1. **Go to Supabase**: Visit https://supabase.com/
2. **Sign up/Login**: Create an account or login
3. **Create New Project**:
   - Click "New Project"
   - Choose your organization
   - Enter project name: `ignitia-backend`
   - Enter database password (save this!)
   - Select region (choose closest to your location)
   - Click "Create new project"

## Step 2: Get Database Connection Details

Once your project is created:

1. **Go to Settings**: Click on "Settings" in the left sidebar
2. **Database Settings**: Click on "Database" 
3. **Connection Info**: You'll see connection details like:
   - Host: `db.xxxxxxxxxxxxx.supabase.co`
   - Database name: `postgres`
   - Port: `5432`
   - User: `postgres`
   - Password: (the one you set during project creation)

4. **Connection String**: You can also find the full connection string in the "Connection string" section:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
   ```

## Step 3: Update Environment Variables

Copy the connection details and update your `.env` file:

```env
# Supabase Database Configuration
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres

# Alternative individual settings (if you prefer)
DB_HOST=db.xxxxxxxxxxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=[YOUR-PASSWORD]
DB_NAME=postgres
DB_SSLMODE=require

# Server Configuration
PORT=3001
GIN_MODE=debug

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URL
FRONTEND_URL=http://localhost:5000
```

## Step 4: Enable Required Extensions (Optional)

In your Supabase dashboard:
1. Go to "SQL Editor"
2. Run these commands if needed:
```sql
-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgcrypto for password hashing (if needed)
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

## Step 5: Test Connection

After updating your `.env` file, restart your Go backend and it will automatically:
1. Connect to Supabase
2. Run database migrations
3. Seed initial data (colleges, sponsors, teams)

## Security Notes

- **Never commit your database password to version control**
- **Use environment variables for all sensitive data**
- **Enable Row Level Security (RLS) in production**
- **Set up proper database backups**

## Supabase Features You Can Use

- **Real-time subscriptions**: For live updates
- **Built-in authentication**: Alternative to custom JWT
- **Storage**: For file uploads (logos, images)
- **Edge Functions**: For serverless functions
- **Dashboard**: For database management

## Troubleshooting

- **Connection timeout**: Check if your IP is allowed (Supabase allows all by default)
- **SSL errors**: Make sure `DB_SSLMODE=require` is set
- **Migration errors**: Check if tables already exist in Supabase dashboard
- **Seed data issues**: Check the logs for specific error messages