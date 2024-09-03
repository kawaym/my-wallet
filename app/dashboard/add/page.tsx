import Form from "@/app/ui/forms/create-entry";

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full p-6 gap-4">
      <header className="flex w-full justify-between font-bold text-3xl">
        Nova entrada
      </header>
      <div className="w-full flex items-center justify-center">
        <Form />
      </div>
    </div>
  );
}
