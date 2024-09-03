"use client";

import { useActionState } from "react";

import Input from "../form-text-input";
import Submit from "../submit-button";
import { createTransaction, TransactionState } from "@/app/lib/actions";

export default function Form() {
  const initialState: TransactionState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createTransaction, initialState);

  return (
    <form
      className="flex flex-col items-center justify-center w-full gap-2"
      action={formAction}
    >
      <Input placeholder="Nome da Transação" type="text" name="name" />
      <Input
        placeholder="Descrição da Transação"
        type="text"
        name="description"
      />
      <Input placeholder="Valor da transação" type="text" name="amount" />
      <Submit text="Salvar entrada" type="submit" />
    </form>
  );
}
