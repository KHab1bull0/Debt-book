import { pool } from "../config/pgdb.js";


export const refreshTokenTable = async () => {
    try{

        const query = `
            CREATE TABLE IF NOT EXISTS refreshTokens(
                email VARCHAR(64) UNIQUE NOT NULL,
                token VARCHAR(128) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        await pool.query(query);
        console.log("Refresh token table yaratildi...");

    } catch(err){
        throw err
    }
}