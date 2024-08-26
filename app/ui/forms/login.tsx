"use client";

import { useActionState } from "react";

import { authenticate } from "@/app/lib/actions";
import Auxiliary from "../auxiliary-button";
import Input from "../form-text-input";
import Submit from "../submit-button";

export default function Form() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  return (
    <form
      className="flex flex-col items-center justify-center gap-2 w-4/5"
      action={formAction}
      id="login-form"
    >
      <Input
        placeholder="E-mail"
        type="email"
        formId="login-form"
        name="email"
      />
      <Input
        placeholder="Senha"
        type="password"
        formId="login-form"
        name="password"
      />
      <Submit text="Entrar" type="submit" />
      <Auxiliary
        text="Primeira vez? Cadastre-se!"
        type="button"
        link="/signup"
      />
    </form>
  );
}
