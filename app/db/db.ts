import { Pool } from "pg";
import { config } from "dotenv";

config({ path: "env.local" });

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT ? process.env.DB_PORT : "5432"),
});
