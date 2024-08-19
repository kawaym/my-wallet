import Image from "next/image";
import Logo from "./ui/logo";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Logo />
    </div>
  );
}
