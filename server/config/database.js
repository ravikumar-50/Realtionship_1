const Database = require('better-sqlite3');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Create database file in server folder
const dbPath = path.join(__dirname, '../database.sqlite');
let db;

if (process.env.NODE_ENV === 'production') {
  console.log('🔌 Connecting to PostgreSQL database...');

  // Use connection string from environment variable
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  // Wrapper to make pg look like better-sqlite3 for basic operations
  // Note: This is a basic adapter. For complex queries, you might need more robust handling.
  db = {
    prepare: (sql) => {
      return {
        run: async (...args) => {
          const client = await pool.connect();
          try {
            // Convert ? to $1, $2, etc. for Postgres
            let i = 1;
            const pgSql = sql.replace(/\?/g, () => `$${i++}`);
            const res = await client.query(pgSql, args);
            return { changes: res.rowCount, lastInsertRowid: res.rows[0]?.id };
          } finally {
            client.release();
          }
        },
        get: async (...args) => {
          const client = await pool.connect();
          try {
            let i = 1;
            const pgSql = sql.replace(/\?/g, () => `$${i++}`);
            const res = await client.query(pgSql, args);
            return res.rows[0];
          } finally {
            client.release();
          }
        },
        all: async (...args) => {
          const client = await pool.connect();
          try {
            let i = 1;
            const pgSql = sql.replace(/\?/g, () => `$${i++}`);
            const res = await client.query(pgSql, args);
            return res.rows;
          } finally {
            client.release();
          }
        }
      };
    },
    exec: async (sql) => {
      const client = await pool.connect();
      try {
        await client.query(sql);
      } finally {
        client.release();
      }
    },
    // Expose pool for direct access if needed
    pool
  };

  // Initialize Postgres tables using schema.sql
  const schemaPath = path.join(__dirname, '../schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schema = fs.readFileSync(schemaPath, 'utf8');
    // Simple split by semicolon might fail on complex functions, but works for basic schemas
    // For robust production, use a migration tool.
    pool.query(schema).then(() => {
      console.log('✅ PostgreSQL database tables initialized');
    }).catch(err => {
      console.error('❌ Error initializing PostgreSQL tables:', err);
    });
  }

} else {
  // Development: SQLite
  console.log('🔌 Connecting to SQLite database...');
  const dbPath = path.join(__dirname, '../database.sqlite');
  db = new Database(dbPath);
  console.log('✅ Connected to SQLite database');

  // Initialize tables (Keep existing inline SQL for SQLite or move to a separate SQLite schema file)
  // For now, we keep the existing inline initialization for stability in dev
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      gender TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS partners (
      id TEXT PRIMARY KEY,
      user1_id TEXT NOT NULL,
      user2_id TEXT NOT NULL,
      relationship_started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'active',
      FOREIGN KEY (user1_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (user2_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(user1_id, user2_id)
    );

    CREATE TABLE IF NOT EXISTS daily_tasks (
      id TEXT PRIMARY KEY,
      partner_id TEXT NOT NULL,
      task_date DATE NOT NULL,
      task_category TEXT,
      task_title TEXT,
      task_description TEXT,
      action_steps TEXT,
      reflection_question TEXT,
      ai_used INTEGER DEFAULT 1,
      tone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS feedback (
      id TEXT PRIMARY KEY,
      task_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      mood TEXT,
      feedback_text TEXT,
      sentiment TEXT,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (task_id) REFERENCES daily_tasks(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS emotional_state (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      average_mood TEXT,
      consistency_score REAL,
      last_active_date DATE,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
  console.log('✅ Database tables initialized (SQLite)');
}

module.exports = db;
