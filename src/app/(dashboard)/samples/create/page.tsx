"use client";
import CustomFormField from "~/components/pages/CustomFormField";
import { TitleContainer } from "~/components/TitleContainer";

import { useState, useTransition } from "react";
import type * as z from "zod";
import { useForm } from "react-hook-form";
import { SampleSchema } from "~/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { toast } from "~/components/ui/use-toast";
import { Label } from "~/components/ui/label";
import { GenderOptions } from "~/lib/constants";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";

import { FormFieldType } from "~/components/pages/CustomFormField";
import { addSample } from "~/server/samples";

const NewSamplePage = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof SampleSchema>>({
    resolver: zodResolver(SampleSchema),
    defaultValues: {
      sample_id: "",
      gender: "",
      sample_type: "",
      source: "",
      location: "",
    },
  });
  const onSubmit = (values: z.infer<typeof SampleSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      addSample(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) {
          toast({
            description: "Samples uploaded successfully",
            variant: "default",
            className: "bg-emerald-500 text-white font-bold ",
          });
          form.reset();
        } else {
          toast({
            // title: { error },
            description: "An error occurred while uploading the samples",
            variant: "destructive",
          });
        }
      });
    });
  };
  return (
    <div className="h-full w-full   ">
      <TitleContainer title="Add Sample" subtitle=" " />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="flex  items-center justify-center    ">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="sample_id"
                label="Sample ID"
                placeholder="sample_id"
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SKELETON}
                name="gender"
                label="Gender "
                renderSkeleton={(field) => (
                  <FormControl>
                    <RadioGroup
                      className="flex h-11 items-center justify-start gap-3 xl:justify-around"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {GenderOptions.map((option) => (
                        <div className="radio-group" key={option}>
                          <RadioGroupItem value={option} id={option} />
                          <Label
                            htmlFor={option}
                            className=" ml-1 cursor-pointer"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </div>
            <div className="flex  items-center justify-center  gap-4  ">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="sample_type"
                label="Sample Type"
                placeholder="sample_type"
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="source"
                label="Source"
                placeholder="Source"
              />
            </div>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="location"
              label="Location"
              placeholder="location"
            />
          </div>
          <Button type="submit" className=" w-full" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewSamplePage;
