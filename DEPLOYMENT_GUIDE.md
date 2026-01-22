# Deploying to Vercel

## 1. Code Preparation (Completed)
Changes have been made to `server/server.js` and `server/config/database.js` to ensure compatibility with Vercel's serverless environment.
The code has been pushed to your GitHub repository.

## 2. Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** -> **"Project"**.
3. Import the repository: `ravikumar-50/Realtionship_1`.
4. In the "Configure Project" screen:
   - **Framework Preset**: Vite (should be detected automatically).
   - **Root Directory**: `./` (default).

## 3. Environment Variables
You MUST set the following environment variables in the Vercel deployment settings.
**Important**: You need a **PostgreSQL** database since SQLite does not work on Vercel. You can use **Vercel Postgres** (storage tab in Vercel) or Supabase.

| Variable Name | Value Description |
|--------------|-------------------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | The full connection string to your PostgreSQL database (e.g., `postgres://user:pass@host/db`). |
| `JWT_SECRET` | A long random string for security. |
| `GEMINI_API_KEY` | Your Google Gemini API Key. |
| `CLIENT_URL` | Your production URL (e.g., `https://your-project.vercel.app`). You can update this after the first deploy. |

## 4. Deploy
Click **Deploy**. Vercel will build the frontend and set up the backend serverless functions.

## 5. Troubleshooting
- If the build fails on `better-sqlite3`, don't worry, the code is set to ignore it in production.
- If the backend returns 500 errors, check the **Function Logs** in Vercel. It usually means the `DATABASE_URL` is incorrect or the database is not reachable.
