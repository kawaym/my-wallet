import type { Transaction } from "@/app/lib/types";
import { convertCentsToReal } from "@/app/lib/utils";

export default function Transaction({
  transaction,
  id,
}: {
  transaction: Transaction;
  id: string;
}) {
  const fixedAmount = convertCentsToReal(transaction.amount);

  const fixedDate = transaction.date.toLocaleDateString("pt-BR", {
    month: "numeric",
    day: "numeric",
  });

  return (
    <div className="flex w-full" id={id}>
      <div className="mr-3">{fixedDate}</div>
      <div className="text-black">{transaction.name}</div>
      <div
        className={`ml-auto ${transaction.type === "debit" ? "text-negativeValue" : "text-positiveValue"}`}
      >
        {fixedAmount}
      </div>
    </div>
  );
}
