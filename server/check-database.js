const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

console.log('\n📊 DATABASE CONTENTS\n');
console.log('='.repeat(60));

// Get all users
const users = db.prepare('SELECT id, name, email, gender, created_at FROM users').all();

console.log('\n👥 USERS TABLE:');
console.log('-'.repeat(60));
if (users.length === 0) {
    console.log('No users yet.');
} else {
    users.forEach((user, index) => {
        console.log(`\n${index + 1}. ${user.name} (${user.gender || 'not specified'})`);
        console.log(`   Email: ${user.email}`);
        console.log(`   ID: ${user.id}`);
        console.log(`   Created: ${user.created_at}`);
    });
}

console.log('\n' + '='.repeat(60));
console.log(`\nTotal users: ${users.length}\n`);

db.close();
