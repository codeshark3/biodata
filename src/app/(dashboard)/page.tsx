import { Button } from "~/components/ui/button";
import { validateRequest } from "~/auth";
import { redirect } from "next/navigation";
import LogoutButton from "~/components/auth/logout_button";
import Link from "next/link";
export default async function HomePage() {
  const { user, session } = await validateRequest();

  if (!user) {
    console.log("no user:", user);
    return redirect("/auth/login");
  }

  return (
    <div className="h-full w-full   ">
      <div>
        <div className="flex items-center justify-between px-4">
          <div className="items-center  ">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold">Dashboard</h2>
            </div>

            <p className="mt-1 text-sm text-gray-500">All Projects</p>
          </div>
          <Button className="btn-primary h-10 w-40 items-center justify-center">
            <Link href="/projects/new">Create Project</Link>
          </Button>
        </div>

        <h1>{user.name}</h1>
        <h2>{session.id}</h2>
        <LogoutButton />
      </div>
    </div>
  );
}
