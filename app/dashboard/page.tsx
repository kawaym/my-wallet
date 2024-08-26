import { signOut } from "@/auth";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full p-6 gap-4">
      <header className="flex w-full justify-between">
        <p className="font-bold text-3xl">Olá, Fulano</p>
        <form
          action={async () => {
            "use server";

            await signOut();
          }}
        >
          <button className="font-bold text-3xl h-full">
            <RiLogoutBoxRLine />
          </button>
        </form>
      </header>
      <main className="w-full h-full flex items-center justify-center bg-white text-secondaryText rounded-md">
        Não há registros de entrada ou saída
      </main>
      <footer className="w-full h-1/6 flex justify-between gap-2">
        <button className="bg-buttonColor w-9/20 font-bold flex flex-col p-3 justify-between text-wrap rounded-md items-start">
          <FiPlusCircle className="text-2xl font-bold" />
          Nova entrada
        </button>
        <button className="bg-buttonColor w-9/20 font-bold flex flex-col p-3 justify-between text-wrap rounded-md items-start">
          <FiMinusCircle className="text-2xl font-bold" />
          Nova saída
        </button>
      </footer>
    </div>
  );
}
