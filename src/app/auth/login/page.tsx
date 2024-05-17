import { validateRequest } from "~/auth";
import { LoginForm } from "~/components/auth/login_form";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { user } = await validateRequest();

  if (user) {
    console.log("user login", user);
    return redirect("/");
  }

  return (
    <div className="flex h-screen  items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
