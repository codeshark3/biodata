"use client";

import { useState, useTransition } from "react";
import type * as z from "zod";
import { useForm } from "react-hook-form";

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
// import { FormError } from "~/components/FormError";
// import { FormSuccess } from "~/components/FormSuccess";
import { ProjectSchema } from "~/schemas";
import { FormCardWrapper } from "~/components/pages/FormCardWrapper";
import { useRouter } from "next/navigation";
import { addProject } from "~/server/projects_queries";
import { TitleContainer } from "../TitleContainer";
import FormFieldComponent from "./FormFieldComponent";
import FormCheckboxComponent from "./FormCheckboxComponent";
import { toast } from "~/components/ui/use-toast";
import { FormError } from "~/components/FormError";
import { FormSuccess } from "~/components/FormSuccess";
import { SampleDialog } from "../SampleDialog";
import FormDialogComponent from "./FormDialogComponent";
import CustomFormField from "./CustomFormField";
import { FormFieldType } from "./CustomFormField";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { ProjectOptions } from "~/constants";
const NewProjectForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [urineDialog, setUrineDialog] = useState(false);

  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const handleUrineDialog = () => {
    setUrineDialog(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: "",
      principal_investigator: "",
      date_of_registration: "",
      institution: "",
      department: "",
      contact_no: "",
      email: "",
      name_irb: "",
      irb_approval_no: "",
      approval_date: new Date().toISOString().substring(0, 10),
      expiry_date: new Date().toISOString().substring(0, 10),
      consent_forms: false,
      consent_for_storage: false,
      urine: false,
      no_urine: 0,

      stool: false,
      no_stool: 0,
      whole_blood: false,
      no_whole_blood: 0,
      serum: false,
      no_serum: 0,
      plasma: false,
      no_plasma: 0,
      skin_snip: false,
      no_skin_snip: 0,
      dna: false,
      no_dna: 0,
      rna: false,
      no_rna: 0,

      others: "",
      no_others: 0,
      storage_requirements: "",
      number_of_samples: 0,
      start_date: new Date().toISOString().substring(0, 10),
      end_date: new Date().toISOString().substring(0, 10),
    },
  });

  const onSubmit = (values: z.infer<typeof ProjectSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      addProject(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
          if (data.success) {
            if (data.success) {
              toast({
                // title: { success },
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
          }
        })
        .catch((err?: any) => {
          console.error(err);
          //   setError("An error occurred during login.");
        });
      // login(values).then((data) => {
      //   // setError(data.error);
      //   // setSuccess(data.success);
      //   if (data.success) {
      //     router.push("/");
      //   }
      // });
    });
  };
  return (
    <div className="h-full w-full ">
      <TitleContainer title="Add Project" subtitle=" " />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormCardWrapper headerLabel="Section A: Project Information">
            <div className="space-y-4 ">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Project Title"
                        type="text"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormFieldComponent
                control={form.control}
                name="title"
                label="Title"
                placeholder="Project Title"
                type="text"
                isPending={false} // Pass the actual isPending state
              /> */}
              <div className=" flex  items-center justify-center  ">
                <FormFieldComponent
                  control={form.control}
                  name="principal_investigator"
                  label="Principal Investigator"
                  placeholder="Principal Investigator"
                  type="text"
                  isPending={false} // Pass the actual isPending state
                />
                <FormFieldComponent
                  control={form.control}
                  name="date_of_registration"
                  label="Date of Registration"
                  placeholder="Date of Registration"
                  type="date"
                  isPending={false} // Pass the actual isPending state
                />
              </div>
              <div className=" flex  items-center justify-center ">
                <FormFieldComponent
                  control={form.control}
                  name="institution"
                  label="Institution"
                  placeholder="Institution"
                  type="text"
                  isPending={false} // Pass the actual isPending state
                />
                <FormFieldComponent
                  control={form.control}
                  name="department" // Pass the actual name of the fieldpartment
                  label="Department"
                  placeholder="Department"
                  type="text"
                  isPending={false} // Pass the actual isPending state
                />
              </div>
              <div className=" flex  items-center justify-center ">
                <FormFieldComponent
                  control={form.control}
                  name="contact_no" // Pass the actual name of the fieldcontact_no
                  label="Contact Number"
                  placeholder="Contact Number"
                  type="text"
                  isPending={false} // Pass the actual isPending state
                />
                <FormFieldComponent
                  control={form.control}
                  name="email" // Pasxxs the actual name of the fieldemail
                  label="Email"
                  placeholder="Email"
                  type="text"
                  isPending={false} // Pass the actual isPending state
                />
              </div>
            </div>
          </FormCardWrapper>
          <FormCardWrapper headerLabel="Section B: Ethical Approval">
            <div className="space-y-4">
              <div className=" flex  items-center justify-center  ">
                <FormFieldComponent
                  control={form.control}
                  name="name_irb"
                  label="Name of IRB"
                  placeholder="Name of IRB"
                  type="text"
                  isPending={false} // Pass the actual isPending state
                />
                <FormFieldComponent
                  control={form.control}
                  name="irb_approval_no"
                  label="IRB Aproval Number"
                  placeholder="IRB Aproval Number"
                  type="text"
                  isPending={false} // Pass the actual isPending state
                />
              </div>
              <div className=" flex  items-center justify-center ">
                <FormFieldComponent
                  control={form.control}
                  name="approval_date"
                  label="Approval Date"
                  placeholder="Approval Date"
                  type="date"
                  isPending={false} // Pass the actual isPending state
                />
                <FormFieldComponent
                  control={form.control}
                  name="expiry_date" // Pass the actual name of the fieldpartment
                  label="Expiry Date"
                  placeholder="Expiry Date"
                  type="date"
                  isPending={false} // Pass the actual isPending state
                />
              </div>

              <div className=" flex  items-center justify-between  ">
                <div className=" flex w-1/2   px-2 py-1">
                  <FormCheckboxComponent
                    control={form.control}
                    name="consent_forms"
                    isPending={false} // Pass the actual isPending state
                    label="Consent Forms Attached?"
                  />
                </div>
                <div className=" flex w-1/2 px-2 py-1">
                  <FormCheckboxComponent
                    control={form.control}
                    name="consent_for_storage"
                    isPending={false} // Pass the actual isPending state
                    label="Consent Covers Storage For Future Use?"
                  />
                </div>
              </div>
            </div>
          </FormCardWrapper>
          <FormCardWrapper headerLabel="Section C: Project Timeline and Specimen Information">
            <div className=" flex  items-center justify-center  ">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="w-[90%]">
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className="w-[90%]">
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="my-4 flex w-full flex-col items-center justify-center border-4 border-primary">
              <p className="pb-2  font-semibold">Specimens Types Required</p>
              <div className="flex w-full  justify-center border-t-4 border-primary px-2 ">
                <div className="flex  w-1/2  flex-col space-y-4  ">
                  <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="urine"
                    label="Urine"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="whole_blood"
                    label="Whole Blood"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="plasma"
                    label="Plasma"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="dna"
                    label="DNA"
                  />
                </div>
                <div className="flex  w-1/2 flex-col space-y-4 ">
                  <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="stool"
                    label="Stool"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="serum"
                    label="Serum"
                  />

                  <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="skin_snip"
                    label="Skin Snip"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="rna"
                    label="RNA"
                  />
                </div>
              </div>
              <FormFieldComponent
                control={form.control}
                name="others"
                label=""
                placeholder="Others"
                type="text"
                isPending={false}
              />
            </div>

            <div className="flex  items-start   border-2   px-2 pt-2">
              <FormField
                control={form.control}
                name="storage_requirements"
                render={({ field }) => (
                  <FormItem className="w-[90%] pr-2">
                    <FormLabel>Storage Requirement</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Storage Requirement"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormFieldComponent
                control={form.control}
                name="number_of_samples"
                label="Number of Samples"
                placeholder="Number of Samples"
                type="number"
                isPending={false}
              />
            </div>
          </FormCardWrapper>
          {/* <FormError message={error} />
          <FormSuccess message={success} /> */}

          <Button type="submit" className=" w-full" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewProjectForm;
