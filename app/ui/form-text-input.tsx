import { HTMLInputTypeAttribute } from "react";

export default function Input(
  {
    type,
    placeholder,
    formId,
  }: {
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    formId?: string;
  } = {
    type: "text",
    placeholder: "Insira texto aqui",
    formId: "",
  }
) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="placeholder:text-black w-full h-12 rounded-md pl-3 "
      form={formId}
    ></input>
  );
}
