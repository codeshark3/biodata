"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { FormHeader } from "./FormHeader";
interface FormCardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  showSocial?: boolean;
}

export const FormCardWrapper = ({
  children,
  headerLabel,
}: FormCardWrapperProps) => {
  return (
    <Card className=" w-full  shadow-md">
      <CardHeader>
        <FormHeader title={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
