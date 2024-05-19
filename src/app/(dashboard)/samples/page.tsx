import React from "react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { validateRequest } from "~/auth";
import { redirect } from "next/navigation";
import { Paths } from "~/lib/constants";
const SamplesPage = async () => {
  const { user } = await validateRequest();

  if (!user) {
    console.log("no user:", user);
    return redirect(Paths.Login);
  }

  return (
    <Button>
      <Link href="./samples/create/">Create</Link>
    </Button>
  );
};

export default SamplesPage;
