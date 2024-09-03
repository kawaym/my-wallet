import { RiLogoutBoxRLine } from "react-icons/ri";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { Suspense } from "react";
import { useSession } from "next-auth/react";

import { signOut } from "@/auth";
import History from "../ui/dashboard/transactions-history";
import Loading from "../ui/dashboard/history-loading";
import auth from "@/middleware";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  return (
    <div className="flex flex-col w-full h-full p-6 gap-4">
      <header className="flex w-full justify-between">
        <p className="font-bold text-3xl">Olá, {session?.user?.name}</p>
        <form
          action={async () => {
            "use server";

            await signOut();
            redirect("/");
          }}
        >
          <button className="font-bold text-3xl h-full">
            <RiLogoutBoxRLine />
          </button>
        </form>
      </header>
      <main className="w-full h-full flex flex-col items-center justify-start bg-white text-secondaryText rounded-md px-3 py-5 relative">
        <Suspense fallback={<Loading />}>
          <History session={session} />
        </Suspense>
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
