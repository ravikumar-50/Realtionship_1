# How to Check Your Database

## Quick Check

Run this command in a new terminal:

```bash
cd server
node check-database.js
```

This will show you all users in the database!

## What You'll See

```
📊 DATABASE CONTENTS
============================================================

👥 USERS TABLE:
------------------------------------------------------------

1. Test User (male)
   Email: test@example.com
   ID: 3abb8678-b5a4-4a99-8ea...
   Created: 2026-01-21 18:00:...

============================================================

Total users: 1
```

## Database File Location

The database is stored at:
```
c:/Users/krkts/OneDrive/Desktop/Project-1/server/database.sqlite
```

You can open this with any SQLite viewer (like DB Browser for SQLite) if you want to explore more!

## Testing Your Own Signup

1. Go to http://localhost:5173
2. Click "Get Started ❤️"
3. Fill in your details
4. Click "Create Account"
5. Run `node check-database.js` to see yourself in the database!

Your data is encrypted (password is hashed with bcrypt) and stored securely! 🔒
