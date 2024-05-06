import { LoginForm } from "~/components/auth/login_form";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex h-screen  items-center justify-center">
      <LoginForm />
    </div>
  );
}
