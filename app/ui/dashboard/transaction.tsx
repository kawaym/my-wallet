import type { Transaction } from "@/app/lib/types";

export default function Transaction({
  transaction,
}: {
  transaction: Transaction;
}) {
  return (
    <div className="">
      <div>{transaction.date.toDateString()}</div>
      <div>{transaction.name}</div>
      <div>{transaction.amount}</div>
    </div>
  );
}
