import { HTMLInputTypeAttribute } from "react";

export default function Input(
  {
    type,
    placeholder,
    formId,
    name,
  }: {
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    formId?: string;
    name?: string;
  } = {
    type: "text",
    placeholder: "Insira texto aqui",
    formId: "",
    name: "",
  }
) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="placeholder:text-black w-full h-12 rounded-md pl-3 text-black"
      form={formId}
      name={name}
    ></input>
  );
}
