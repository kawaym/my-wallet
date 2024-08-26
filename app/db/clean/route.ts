import { pool } from "../db";
import { users } from "../../lib/placeholder-data";
import bcrypt from "bcrypt";

const client = await pool.connect();

async function dropTables() {
  await client.query(`DROP TABLE users;`);
}

export async function GET() {
  try {
    await client.query("BEGIN");
    await dropTables();
    await client.query("COMMIT");

    return Response.json({ message: "Database cleaned successfully" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
