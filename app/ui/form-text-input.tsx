"use client";

import { HTMLInputTypeAttribute } from "react";

export default function Input(
  {
    type,
    placeholder,
  }: { type?: HTMLInputTypeAttribute; placeholder?: string } = {
    type: "text",
    placeholder: "Insira texto aqui",
  }
) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="placeholder:text-black w-full h-12 rounded-md pl-3 "
    ></input>
  );
}
