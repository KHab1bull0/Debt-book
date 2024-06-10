import { pool } from "../config/pgdb.js";

export const deptsTable = async () => {
    try{

        const query = `
            CREATE TABLE IF NOT EXISTS depts(
                id SERIAL PRIMARY KEY,
                amount INT NOT NULL,
                description VARCHAR(255),
                due_date DATE CHECK (due_date > CURRENT_TIMESTAMP),
                status VARCHAR(10) CHECK (status IN ('new', 'paid', 'canceled'))
            );
        `;

        await pool.query(query);
        console.log('Depts table yaratildi...');

    }catch(err){
        throw err
    }
}