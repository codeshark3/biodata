"use client";
import { useState, useTransition } from "react";
import type * as z from "zod";
import { LoginSchema } from "~/schemas";
import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { FormError } from "~/components/FormError";
import { FormSuccess } from "~/components/FormSuccess";
import { login } from "~/server/auth";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
          if (data.success) {
            router.push("/");
          }
        })
        .catch((err) => {
          console.error(err);
          setError("An error occurred during login.");
        });
      //  login(values).then((data) => {
      //   setError(data.error);
      //   setSuccess(data.success);
      //   if (data.success) {
      //     router.push("/");
      //   }
      // });
    });
  };
  return (
    <CardWrapper headerLabel="Login">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="user@email.com"
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="*******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className=" w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
