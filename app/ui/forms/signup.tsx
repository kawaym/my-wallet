"use client";

import Logo from "../logo";
import Input from "../form-text-input";
import Submit from "../submit-button";
import Auxiliary from "../auxiliary-button";

export default function Form() {
  function printa() {
    console.log("printa");
  }

  return (
    <form
      className="flex flex-col items-center justify-center gap-2 w-4/5"
      action={printa}
    >
      <Input placeholder="Nome" type="text" />
      <Input placeholder="E-mail" type="email" />
      <Input placeholder="Senha" type="password" />
      <Input placeholder="Confirme a senha" type="password" />
      <Submit text="Cadastrar" type="submit" />
      <Auxiliary
        text="Já tem uma conta? Entre agora!"
        type="button"
        link="login"
      />
    </form>
  );
}
