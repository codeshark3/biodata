import { logout } from "~/server/auth";
import { Button } from "~/components/ui/button";

const LogoutButton = async () => {
  return (
    <form action={logout}>
      <Button className="btn-primary hover:bg-accent-500 h-10 w-40 items-center justify-center">
        Logout
      </Button>
    </form>
  );
};

export default LogoutButton;
