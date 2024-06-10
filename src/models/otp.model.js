import { pool } from "../config/pgdb.js";


export const createOtpTable = async() => {

    try {
        const query = `
            CREATE TABLE IF NOT EXISTS otps (
                email VARCHAR(128) UNIQUE,
                otp VARCHAR(6)
            );
        `;

        const info = await pool.query(query);
        console.log('OTP table yaratildi.');

    } catch (err) {
        throw err;
    };
};
