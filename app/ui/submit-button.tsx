import { CustomButtonProps } from "../lib/types";

export default function Submit({ text, type, className }: CustomButtonProps) {
  return (
    <button
      type={type}
      className={`bg-buttonColor w-full h-12 rounded-md font-bold text-white ${className}`}
    >
      {text}
    </button>
  );
}
