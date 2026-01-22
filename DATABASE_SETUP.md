# Quick PostgreSQL Setup for Windows

## Option 1: Install PostgreSQL (Recommended for Production)

### Step 1: Download PostgreSQL
1. Go to: https://www.postgresql.org/download/windows/
2. Download the installer (recommended: PostgreSQL 15 or 16)
3. Run the installer

### Step 2: Installation
- **Password**: Set a password for the `postgres` user (remember this!)
- **Port**: Keep default `5432`
- Click through the installer

### Step 3: Verify Installation
Open PowerShell and run:
```powershell
psql --version
```

If it shows a version number, PostgreSQL is installed!

---

## Option 2: Use SQLite (Quick Setup, No Install)

If you want to skip PostgreSQL installation for now, I can quickly convert the backend to use SQLite instead. It's file-based and requires no server setup.

**Which option do you prefer?**

---

## For PostgreSQL Setup (Choose Option 1):

### Create the Database

Open Command Prompt or PowerShell and run:

```powershell
# Connect to PostgreSQL
psql -U postgres

# At the postgres=# prompt, type:
CREATE DATABASE relationship_platform;

# List databases to verify:
\l

# Exit:
\q
```

### Run the Schema

```powershell
# Navigate to server folder
cd C:\Users\krkts\OneDrive\Desktop\Project-1\server

# Run schema file
psql -U postgres -d relationship_platform -f schema.sql
```

### Create .env File

In the `server` folder, create a `.env` file:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=relationship_platform
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD_HERE

JWT_SECRET=my_super_secret_jwt_key_12345
GEMINI_API_KEY=your_gemini_api_key_here

CLIENT_URL=http://localhost:5173
```

Replace `YOUR_POSTGRES_PASSWORD_HERE` with the password you set during installation.

### Start the Backend

```powershell
cd server
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:5000
✅ Connected to PostgreSQL database
```

---

## Quick Test

Open a new browser tab and visit:
```
http://localhost:5000/health
```

You should see: `{"status":"OK","message":"Relationship Platform API is running"}`

---

**Let me know which option you prefer, and I'll help you set it up!**
