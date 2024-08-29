"use client";

import { fetchTransactions } from "@/app/lib/data";
import Transaction from "./transaction";
import type { Transaction as type } from "@/app/lib/types";

import { useEffect } from "react";
import { convertCentsToReal } from "@/app/lib/utils";

export default function History() {
  async function fetch() {
    const transactions = await fetchTransactions();
    return transactions;
  }

  useEffect(() => {
    fetch();
  }, []);

  const placeholderCreditTransaction: type = {
    id: "test",
    name: "Almoço mãe",
    description: "asas",
    type: "credit",
    amount: 10000,
    date: new Date(),
    userId: "test",
  };

  const placeholderDebitTransaction: type = {
    id: "test1",
    name: "Almoço mãe",
    description: "asas",
    type: "debit",
    amount: 10000,
    date: new Date(),
    userId: "test",
  };

  const placeholderTransactions = [
    placeholderCreditTransaction,
    placeholderDebitTransaction,
  ];

  const balance = placeholderTransactions
    .map((data) => {
      return { amount: data.amount, type: data.type };
    })
    .reduce((previous, current) => {
      let amount = previous.amount + current.amount;
      let type: "credit" | "debit" = "credit";
      if (previous.type === "credit" && current.type === "debit") {
        amount = previous.amount - current.amount;
      }
      if (previous.type === "debit" && current.type === "credit") {
        amount = current.amount - previous.amount;
      }
      if (previous.type === "debit" && current.type === "debit") {
        amount = 0 - current.amount - previous.amount;
      }
      if (amount < 0) {
        type = "debit";
        amount = Math.abs(amount);
      }
      return { type, amount };
    });

  const { type: balanceType } = balance;
  const balanceAmount = convertCentsToReal(balance.amount);

  return (
    <main className="w-full h-full flex flex-col gap-2 items-center bg-white text-secondaryText rounded-md px-3 py-5 relative">
      {/* Não há registros de entrada ou saída */}
      {placeholderTransactions.map((data) => {
        return <Transaction key={data.id} transaction={data} />;
      })}

      <div className="flex justify-between w-full absolute bottom-5 px-3">
        <p className="text-black font-bold text-xl">SALDO</p>
        <p
          className={`${balanceType === "debit" ? "text-negativeValue" : "text-positiveValue"} text-xl`}
        >
          {balanceAmount}
        </p>
      </div>
    </main>
  );
}
