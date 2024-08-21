import Logo from "../ui/logo";
import Form from "../ui/forms/login";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <Logo />
      <Form />
    </div>
  );
}
