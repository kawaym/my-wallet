"use client";

import { fetchTransactions } from "@/app/lib/data";
import Transaction from "./transaction";
import type { Transaction as type } from "@/app/lib/types";

import { useEffect, useState } from "react";
import { convertCentsToReal } from "@/app/lib/utils";

export default function History() {
  const [transactions, setTransactions] = useState<type[]>([]);

  useEffect(() => {
    async function fetch() {
      const transactions = await fetchTransactions();
      setTransactions(transactions);
    }
    fetch();
  }, []);

  if (transactions.length === 0) {
    return (
      <main className="w-full h-full flex flex-col items-center justify-center bg-white text-secondaryText rounded-md px-3 py-5">
        Não há registros de entrada ou saída
      </main>
    );
  }

  const balance = transactions
    .map((data) => {
      return { amount: data.amount, type: data.type };
    })
    .reduce((previous, current) => {
      let previousAmount = Number(previous.amount);
      let currentAmount = Number(current.amount);
      let amount = previousAmount + currentAmount;
      let type: "credit" | "debit" = previous.type;
      if (previous.type === "credit" && current.type === "debit") {
        amount = previousAmount - currentAmount;
      }
      if (previous.type === "debit" && current.type === "credit") {
        amount = currentAmount - previousAmount;
      }
      if (previous.type === "debit" && current.type === "debit") {
        amount = -currentAmount - previousAmount;
      }
      if (amount < 0) {
        type = "debit";
      }
      return { type, amount };
    });
  const { type: balanceType } = balance;
  const balanceAmount = convertCentsToReal(balance.amount);

  return (
    <main className="w-full h-full flex flex-col gap-2 items-center bg-white text-secondaryText rounded-md px-3 py-5 relative">
      {transactions?.map((data) => {
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
