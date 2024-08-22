import { CustomButtonProps } from "../lib/types";

export default function Auxiliary({
  text,
  type,
  className,
}: CustomButtonProps) {
  return (
    <button
      type={type}
      className={`font-bold text-base text-white focus:underline hover:underline ${className}`}
    >
      {text}
    </button>
  );
}
