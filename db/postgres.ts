import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

//db host will change each time EC2 Instance is stopped

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: 5432
});
