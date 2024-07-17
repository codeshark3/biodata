// DialogComponent.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Control, Controller } from "react-hook-form";
import FormFieldComponent from "./FormFieldComponent";
import { Button } from "~/components/ui/button";
interface DialogComponentProps {
  isOpen: boolean;
  onClose: () => void;
  control: Control<any>;
  name: string;
  label: string;
  isPending: boolean;
}

const FormDialogComponent: React.FC<DialogComponentProps> = ({
  isOpen,
  onClose,
  control,
  name,
  label,
  isPending,
}) => {
  console.log(name);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter number of {label} specimens</DialogTitle>
          <DialogDescription className="flex  gap-2 py-1">
            <FormField
              control={control}
              name={name}
              render={({ field }) => (
                <FormItem className="w-[90%] pr-2">
                  <FormControl>
                    <Input
                      {...field}
                      type="numeric"
                      placeholder="Number of Specimens"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button onClick={onClose} className=" ">
              close
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialogComponent;
