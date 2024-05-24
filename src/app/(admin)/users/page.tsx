import React from "react";
import { validateRequest } from "~/auth";
import { redirect } from "next/navigation";
const UsersPage = async () => {
  const { user } = await validateRequest();

  // if (!user) {
  //   redirect("/login");
  // }
  // if (user.role !== "admin") {
  //   redirect("/");
  // }
  return <div>UsersPage</div>;
};

export default UsersPage;
