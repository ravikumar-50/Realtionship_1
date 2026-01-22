# Backend Setup Guide

## 📋 Prerequisites

1. **Node.js** (v16+)
2. **PostgreSQL** (v13+)
3. **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Set Up PostgreSQL Database

**Option A: Using psql command line**
```bash
# Create database
psql -U postgres
CREATE DATABASE relationship_platform;
\q

# Run schema
psql -U postgres -d relationship_platform -f schema.sql
```

**Option B: Using pgAdmin**
- Open pgAdmin
- Create new database: `relationship_platform`
- Open Query Tool and paste contents of `schema.sql`
- Execute

### 3. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` with your actual values:
```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=relationship_platform
DB_USER=postgres
DB_PASSWORD=your_actual_password

JWT_SECRET=generate_a_random_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here

CLIENT_URL=http://localhost:5173
```

### 4. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on: **http://localhost:5000**

---

## 🧪 Testing the API

### Health Check
```bash
curl http://localhost:5000/health
```

### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ravi",
    "email": "ravi@example.com",
    "password": "password123",
    "gender": "male"
  }'
```

### Sign In
```bash
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ravi@example.com",
    "password": "password123"
  }'
```

Copy the `token` from the response for authenticated requests.

### Generate a Task (Protected)
```bash
curl -X POST http://localhost:5000/api/tasks/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📁 Project Structure

```
server/
├── config/
│   └── database.js          # PostgreSQL connection
├── controllers/
│   ├── authController.js    # Signup/Signin logic
│   ├── taskController.js    # AI task generation
│   ├── partnerController.js # Partner linking
│   └── feedbackController.js
├── middleware/
│   └── auth.js              # JWT verification
├── prompts/
│   └── master-prompt.js     # AI prompt template
├── routes/
│   ├── auth.js
│   ├── tasks.js
│   ├── partners.js
│   └── feedback.js
├── services/
│   └── aiService.js         # Gemini AI integration
├── .env.example
├── schema.sql               # Database schema
├── server.js                # Main entry point
└── package.json
```

---

## 🎨 AI Prompt System

The AI uses a **master prompt template** with:
- **Tone control** (Calm, Romantic, Playful)
- **Category selection** (Appreciation, Communication, etc.)
- **Mood awareness** (User A + User B moods)
- **Fallback tasks** if AI fails

See `/server/prompts/master-prompt.js` for details.

---

## 🔐 Security Features

✅ **Password hashing** with bcrypt  
✅ **JWT authentication**  
✅ **Environment-based secrets**  
✅ **CORS protection**  
✅ **SQL injection prevention** (parameterized queries)

---

## 🐛 Troubleshooting

**Database connection error?**
- Check PostgreSQL is running: `pg_isready`
- Verify `.env` credentials match your Postgres setup

**AI generation failing?**
- Ensure `GEMINI_API_KEY` is valid
- Check Gemini API quota/limits
- Fallback tasks will be used if AI fails

**CORS errors?**
- Make sure `CLIENT_URL` in `.env` matches your frontend URL
