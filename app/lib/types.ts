export interface ClassName {
  className?: React.ComponentProps<"div">["className"];
}

export interface CustomButtonProps extends ClassName {
  text: string;
  type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type TransactionType = "credit" | "debit";

export type Transaction = {
  id: string;
  name: string;
  description: string;
  type: TransactionType;
  amount: number;
  date: Date;
  userId: string;
};
