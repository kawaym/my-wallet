"use server";

import { pool } from "../db/db";

import { Transaction } from "./types";

export async function fetchTransactions() {
  try {
    console.log("Fetching transactions...");

    const data = await pool.query<Transaction[]>("SELECT * FROM transactions");

    return data.rows;
  } catch (e) {
    console.error("Database Error: ", e);
    throw new Error("Failed to fetch transactions");
  }
}
