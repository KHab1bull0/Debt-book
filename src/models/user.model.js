import { pool } from "../config/pgdb.js";

export const dropAll = async() => {
    try {
        
        const query = `
            DROP TABLE users;
            DROP TYPE rolelist;
            DROP TABLE otps;
            DROP TABLE depts;
        `;

        await pool.query(query);
        console.log("All deleted..");

    } catch (err) {
        throw err
    }
}


export const userTable = async () => {
    try{

        const enumquery = `CREATE TYPE rolelist as ENUM('user', 'admin');`

        await pool.query(enumquery);
        console.log('enum yaratildi...');

        const query = `
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(32) CHECK (LENGTH(username) > 3) UNIQUE NOT NULL,
                email VARCHAR(32) UNIQUE,
                password VARCHAR(100) CHECK (LENGTH(password) > 3),
                status VARCHAR(16) DEFAULT 'pending',
                role rolelist DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        await pool.query(query);
        console.log('User table yaratildi...');

    }catch(err){
        throw err;
    }
}