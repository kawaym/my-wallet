"use client";

export default function Submit({ text }: { text: string }) {
  return (
    <button
      type="submit"
      className="bg-buttonColor w-full h-12 rounded-md font-bold text-white"
    >
      {text}
    </button>
  );
}
