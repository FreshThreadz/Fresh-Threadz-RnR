import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.HOST
});

// async function runDB () {
//   console.log('starting up')

//   const pool = new Pool({
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//   });
//   try {
//     await pool.connect();
//     console.log('successfully connected')
//   } catch (err) {
//     console.log('MADE IT TO ERROR')
//     console.error(err)
//   }
// }
