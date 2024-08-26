import { pool } from "../db";
import { transactions, users } from "../../lib/placeholder-data";
import bcrypt from "bcrypt";

const client = await pool.connect();

async function seedUser() {
  await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        date DATE NOT NULL
    );  
  `);

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const date = new Date().toISOString().split("T")[0];
      const query = `
            INSERT INTO users (id, name, email, password, date)
            VALUES ('${user.id}', '${user.name}', '${user.email}', '${hashedPassword}', '${date}')
            ON CONFLICT (id) DO NOTHING;      
        `;
      return client.query(query);
    })
  );

  return insertedUsers;
}

async function seedTransaction() {
  await client.query(`
    CREATE TABLE IF NOT EXISTS transactions (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description VARCHAR(255),
      type VARCHAR(255) NOT NULL,
      amount BIGINT NOT NULL,
      date DATE NOT NULL,
      userId UUID NOT NULL
    );
  `);

  const insertedTransactions = await Promise.all(
    transactions.map(async (transaction) => {
      const query = `INSERT INTO transactions (id, name, description, type, amount, date, userId)
       VALUES ('${transaction.id}', '${transaction.name}', '${transaction.description}', '${transaction.type}', '${transaction.amount}', '${transaction.date}', '${transaction.userId}')
       ON CONFLICT (id) DO NOTHING;
      `;
      return client.query(query);
    })
  );

  return insertedTransactions;
}

export async function GET() {
  try {
    await client.query("BEGIN");
    await seedUser();
    await seedTransaction();
    await client.query("COMMIT");

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
