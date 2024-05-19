"use client";
import { logout } from "~/server/auth";
import { Button } from "~/components/ui/button";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Form } from "~/components/ui/form";
import { FormError } from "~/components/FormError";
import { FormSuccess } from "~/components/FormSuccess";
const LogoutButton = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    defaultValues: { logout: "" },
  });
  const onSubmit = () => {
    setError("");
    setSuccess("");
    startTransition(() => {
      logout()
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);

          if (data.success) {
            window.location.reload();
            // router.replace(router.asPath).then(() => {

            // });
            router.push("/auth/login");
          }
        })
        .catch((err) => {
          console.error(err);
          setError("An error occurred during logout.");
        });
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          className="btn-primary hover:bg-accent-500 h-10 w-40 items-center justify-center"
          disabled={isPending}
        >
          Logout
        </Button>
      </form>
    </Form>
  );
};

export default LogoutButton;
