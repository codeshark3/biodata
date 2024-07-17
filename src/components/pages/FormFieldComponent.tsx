import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Control, Controller } from "react-hook-form";

interface FormFieldComponentProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  type: string;
  isPending: boolean;
}

const FormFieldComponent: React.FC<FormFieldComponentProps> = ({
  control,
  name,
  label,
  placeholder,
  type,
  isPending,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-1/2 pr-4">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              type={type}
              disabled={isPending}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldComponent;
