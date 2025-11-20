const { Client } = require('pg');
const bcrypt = require('bcrypt');

async function seed() {
    const client = new Client({
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'medequip',
    });

    try {
        await client.connect();

        const hash = await bcrypt.hash('password', 10);

        // Check if admin exists
        const res = await client.query("SELECT * FROM users WHERE email = 'admin@medequip.com'");
        if (res.rows.length === 0) {
            await client.query(
                "INSERT INTO users (full_name, email, password_hash, role, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())",
                ['Admin User', 'admin@medequip.com', hash, 'ADMIN', 'ACTIVE']
            );
            console.log('Admin user created');
        } else {
            console.log('Admin user already exists');
        }
    } catch (err) {
        console.error('Seed failed', err);
    } finally {
        await client.end();
    }
}

seed();
