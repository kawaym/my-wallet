"use client";

import { CustomButtonProps } from "../lib/types";
import { useRouter } from "next/navigation";

interface AuxiliaryButtonProps extends CustomButtonProps {
  link: string;
}

export default function Auxiliary({
  text,
  type,
  className,
  link,
}: AuxiliaryButtonProps) {
  const router = useRouter();

  return (
    <button
      type={type}
      className={`font-bold text-base text-white focus:underline hover:underline ${className}`}
      onClick={() => router.push(link)}
    >
      {text}
    </button>
  );
}
