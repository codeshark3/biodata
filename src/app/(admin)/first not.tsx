import { Button } from "~/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TitleContainer } from "~/components/TitleContainer";
import { validateRequest } from "~/auth";

export default async function AdminPage() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }
  if (user.role !== "admin") {
    redirect("/");
  }
  return (
    <div className="h-full w-full   ">
      <div>
        <div className="flex items-center justify-between  px-4">
          <TitleContainer title="Users" subtitle="All Users" />
          <Button className="btn-primary h-10 w-40">
            <Link href="/admin/users/new">Add New User</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
