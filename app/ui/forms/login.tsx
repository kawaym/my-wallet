"use client";

import Auxiliary from "../auxiliary-button";
import Input from "../form-text-input";
import Submit from "../submit-button";

export default function Form() {
  function printa() {
    console.log("printa");
  }
  return (
    <form
      className="flex flex-col items-center justify-center gap-2 w-4/5"
      action={printa}
    >
      <Input placeholder="E-mail" type="email" />
      <Input placeholder="Senha" type="password" />
      <Submit text="Entrar" type="submit" />
      <Auxiliary text="Primeira vez? Cadastre-se!" type="button" />
    </form>
  );
}
