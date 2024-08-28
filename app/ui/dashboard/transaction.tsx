import type { Transaction } from "@/app/lib/types";

export default function Transaction({
  transaction,
}: {
  transaction: Transaction;
}) {
  const fixedAmount = (transaction.amount / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const fixedDate = transaction.date.toLocaleDateString("pt-BR", {
    month: "numeric",
    day: "numeric",
  });

  return (
    <div className="flex w-full px-3">
      <div className="mr-3">{fixedDate}</div>
      <div className="text-black">{transaction.name}</div>
      <div
        className={`ml-auto ${transaction.type === "debit" ? "text-debit" : "text-credit"}`}
      >
        {fixedAmount}
      </div>
    </div>
  );
}
