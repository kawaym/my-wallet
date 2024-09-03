"use client";

import Logo from "../logo";
import Input from "../form-text-input";
import Submit from "../submit-button";
import Auxiliary from "../auxiliary-button";
import { createUser } from "@/app/lib/actions";
import { useActionState } from "react";
import { UserState } from "@/app/lib/actions";

export default function Form() {
  const initialState: UserState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createUser, initialState);

  return (
    <form
      className="flex flex-col items-center justify-center gap-2 w-4/5"
      action={formAction}
    >
      <Input placeholder="Nome" type="text" name="name" />
      <Input placeholder="E-mail" type="email" name="email" />
      <Input placeholder="Senha" type="password" name="password" />
      <Input
        placeholder="Confirme a senha"
        type="password"
        name="confirmPassword"
      />
      <Submit text="Cadastrar" type="submit" />
      <Auxiliary
        text="Já tem uma conta? Entre agora!"
        type="button"
        link="/login"
      />
    </form>
  );
}
