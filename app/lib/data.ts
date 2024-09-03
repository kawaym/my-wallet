"use server";

import { pool } from "../db/db";

import { Transaction } from "./types";

export async function fetchTransactions(email: string | null | undefined) {
  try {
    console.log("Fetching transactions...");

    const data =
      await pool.query<Transaction>(`SELECT transactions.id, transactions.name, transactions.description, transactions.type, transactions.amount, 
      transactions.date FROM transactions JOIN users ON users.id = transactions.userId WHERE users.email = '${email}'`);

    return data.rows;
  } catch (e) {
    console.error("Database Error: ", e);
    throw new Error("Failed to fetch transactions");
  }
}
