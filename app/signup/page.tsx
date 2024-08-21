import Logo from "../ui/logo";
import Form from "../ui/forms/signup";

export default function SignUp() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <Logo />
      <Form />
    </div>
  );
}
