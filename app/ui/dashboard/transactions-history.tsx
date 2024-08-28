"use client";

import { fetchTransactions } from "@/app/lib/data";
import Transaction from "./transaction";
import type { Transaction as type } from "@/app/lib/types";

import { useEffect } from "react";

export default function History() {
  async function fetch() {
    const transactions = await fetchTransactions();
    return transactions;
  }

  useEffect(() => {
    fetch();
  }, []);

  const placeholderTransaction: type = {
    id: "test",
    name: "Almoço mãe",
    description: "asas",
    type: "credit",
    amount: 10000,
    date: new Date(),
    userId: "test",
  };

  return (
    <main className="w-full h-full flex items-center justify-center bg-white text-secondaryText rounded-md">
      {/* Não há registros de entrada ou saída */}
      <Transaction transaction={placeholderTransaction} />
    </main>
  );
}
