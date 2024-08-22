"use client";

import React, { useState, useTransition } from "react";
import CustomFormField from "~/components/forms/CustomFormField";
import { FormFieldType } from "./CustomFormField";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { FormCardWrapper } from "~/components/forms/FormCardWrapper";
import { useForm } from "react-hook-form";
import { TitleContainer } from "~/components/TitleContainer";

import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "~/components/ui/form";
import { SpecimenSchema } from "~/schemas";
const SpecimenSubmissionForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof SpecimenSchema>>({
    resolver: zodResolver(SpecimenSchema),
    defaultValues: {
      title: "",
      submitter_name: "",
      date_of_submission: "",
      institution: "",
      department: "",
      contact_no: "",
      email: "",
      irb_approval_no: "",

      approval_date: new Date().toISOString().substring(0, 10),
      collection_date: new Date().toISOString().substring(0, 10),
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

      number_of_samples: 0,

      consent_forms_attached: false,
      ethics_compliance: false,
      approved_by: "",

      storage_condition: "",
      preservatives: "",
      handling_instructions: "",

      urine_batch_id: "",
      stool_batch_id: "",
      whole_blood_batch_id: "",
      serum_batch_id: "",
      plasma_batch_id: "",
      skin_snip_batch_id: "",
      dna_batch_id: "",
      rna_batch_id: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SpecimenSchema>) => {
    startTransition(() => {
      console.log(values);
    });
  };
  return (
    <div className="h-full w-full ">
      <TitleContainer title="Add Submission" subtitle=" " />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormCardWrapper headerLabel="Section A: Project Information">
            <div className="space-y-4 ">
              <CustomFormField
                control={form.control}
                name="title"
                label="Title"
                placeholder="Title"
                fieldType={FormFieldType.INPUT}
              />
              {/* <FormFieldComponent
            control={form.control}
            name="title"
            label="Title"
            placeholder="Project Title"
            type="text"
            isPending={false}   
          /> */}
              <div className=" flex  items-center justify-center  ">
                <CustomFormField
                  control={form.control}
                  name="submitter_name"
                  label="Name of Submitter"
                  placeholder="Name of Submitter"
                  fieldType={FormFieldType.INPUT}
                />
                <CustomFormField
                  control={form.control}
                  name="submission_date"
                  label="Date of Submisson"
                  placeholder="Date of Submisson"
                  fieldType={FormFieldType.DATE_PICKER}
                />
              </div>
              <div className=" flex  items-center justify-center ">
                <CustomFormField
                  control={form.control}
                  name="institution"
                  label="Institution"
                  placeholder="Institution"
                  fieldType={FormFieldType.INPUT}
                />
                <CustomFormField
                  control={form.control}
                  name="department"
                  label="Department"
                  placeholder="Department"
                  fieldType={FormFieldType.INPUT}
                />
              </div>
              <div className=" flex  items-center justify-center ">
                <CustomFormField
                  control={form.control}
                  name="contact_no"
                  label="Contact Number"
                  placeholder="Contact Number"
                  fieldType={FormFieldType.INPUT}
                />
                <CustomFormField
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="Email"
                  fieldType={FormFieldType.INPUT}
                />
              </div>
            </div>
          </FormCardWrapper>

          <FormCardWrapper headerLabel="Section B: Specimen Details">
            <div className=" flex  items-center justify-center  "></div>

            <div className="my-4 flex w-full flex-col items-center justify-center ">
              <div className="flex w-full  justify-center  border-primary px-2">
                <div className="flex  w-[45%]  flex-col space-y-2   ">
                  <p className="pb-2  font-semibold">
                    Specimens Types Required And Number
                  </p>
                  <div className="flex items-center justify-center ">
                    <CustomFormField
                      fieldType={FormFieldType.CHECKBOX}
                      control={form.control}
                      name="urine"
                      label="Urine"
                    />
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="no_urine"
                      placeholder="Number"
                    />
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="urine_batch_id"
                      placeholder="Batch IDs"
                    />
                  </div>
                  <div className="flex items-center justify-center ">
                    {" "}
                    <CustomFormField
                      fieldType={FormFieldType.CHECKBOX}
                      control={form.control}
                      name="whole_blood"
                      label="Whole Blood"
                    />{" "}
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="no_whole_blood"
                      placeholder="Number"
                    />
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="whole_blood_batch_id"
                      placeholder="Batch ID"
                    />
                  </div>
                  <div className="flex items-center justify-center ">
                    {" "}
                    <CustomFormField
                      fieldType={FormFieldType.CHECKBOX}
                      control={form.control}
                      name="plasma"
                      label="Plasma"
                    />{" "}
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="no_plasma"
                      placeholder="Batch IDs"
                    />
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="plasma_batch_id"
                      placeholder="Batch IDs"
                    />
                  </div>
                  <div className="flex items-center justify-center ">
                    {" "}
                    <CustomFormField
                      fieldType={FormFieldType.CHECKBOX}
                      control={form.control}
                      name="dna"
                      label="DNA"
                    />{" "}
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="no_dna"
                      placeholder="Batch IDs"
                    />{" "}
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="dna_batch_id"
                      placeholder="Batch IDs"
                    />
                  </div>
                  <div className="flex items-center justify-center ">
                    {" "}
                    <CustomFormField
                      fieldType={FormFieldType.CHECKBOX}
                      control={form.control}
                      name="stool"
                      label="Stool"
                    />
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="no_stool"
                      placeholder="Batch IDs"
                    />
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="stool_batch_id"
                      placeholder="Batch IDs"
                    />
                  </div>
                  <div className="flex items-center justify-center ">
                    {" "}
                    <CustomFormField
                      fieldType={FormFieldType.CHECKBOX}
                      control={form.control}
                      name="serum"
                      label="Serum"
                    />
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="no_serum"
                      placeholder="Batch IDs"
                    />
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="serum_batch_id"
                      placeholder="Batch IDs"
                    />
                  </div>
                  <div className="flex items-center justify-center ">
                    {" "}
                    <CustomFormField
                      fieldType={FormFieldType.CHECKBOX}
                      control={form.control}
                      name="skin_snip"
                      label="Skin Snip"
                    />{" "}
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="no_skin_snip"
                      placeholder="Batch IDs"
                    />
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="skin_snip_batch_id"
                      placeholder="Batch IDs"
                    />
                  </div>
                  <div className="flex items-center justify-center ">
                    <CustomFormField
                      fieldType={FormFieldType.CHECKBOX}
                      control={form.control}
                      name="rna"
                      label="RNA"
                    />
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="no_rna"
                      placeholder="Batch IDs"
                    />
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="rna_batch_id"
                      placeholder="Batch IDs"
                    />
                  </div>
                </div>

                <div className="flex  w-[55%] flex-col space-y-4 border-l-2 px-2 ">
                  <CustomFormField
                    control={form.control}
                    name="collection_date"
                    label="Date of Collection"
                    placeholder="Storage Requirement"
                    fieldType={FormFieldType.DATE_PICKER}
                  />{" "}
                  <CustomFormField
                    control={form.control}
                    name="storage_condition"
                    label="Storage Condition Prior to Submission"
                    placeholder="Storage Requirement"
                    fieldType={FormFieldType.INPUT}
                  />
                  <CustomFormField
                    control={form.control}
                    name="preservatives"
                    label="Preservatives Used[If any]"
                    placeholder="Storage Requirement"
                    fieldType={FormFieldType.INPUT}
                  />
                  <CustomFormField
                    control={form.control}
                    name="handling_instructions"
                    label="Handling Instructions[If any]"
                    placeholder="Storage Requirement"
                    fieldType={FormFieldType.INPUT}
                  />
                </div>
              </div>
            </div>

            {/* <div className="flex  items-start     px-2 pt-2">
              <div className="flex w-1/2 px-2">
                <CustomFormField
                  control={form.control}
                  name="storage_requirements"
                  label="Storage Requirement"
                  placeholder="Storage Requirement"
                  fieldType={FormFieldType.TEXTAREA}
                />
              </div>

              <div className="flex w-1/2 flex-col">
                {" "}
                {/* <CustomFormField
              control={form.control}
              name="others"
              label="Others"
              placeholder="Others"
              fieldType={FormFieldType.INPUT}
            /> 
                <CustomFormField
                  control={form.control}
                  name="number_of_samples"
                  label="Number of Samples"
                  placeholder="Number of Samples"
                  fieldType={FormFieldType.INPUT}
                />
              </div>
            </div> */}
          </FormCardWrapper>
          <FormCardWrapper headerLabel="Section C: Consent And Compliance">
            <div className="space-y-4">
              <div className=" flex  items-center justify-center  ">
                <CustomFormField
                  control={form.control}
                  name="irb_approval_no"
                  label="IRB Aproval Number"
                  placeholder="IRB Aproval Number"
                  fieldType={FormFieldType.INPUT}
                />{" "}
                <CustomFormField
                  control={form.control}
                  name="approval_date"
                  label="Approval Date"
                  placeholder="Approval Date"
                  fieldType={FormFieldType.DATE_PICKER}
                />
              </div>

              <div className=" flex  items-center justify-between  ">
                <div className=" flex w-1/2   px-2 py-1">
                  <CustomFormField
                    control={form.control}
                    name="ethics_compliance"
                    label="Compliance  with Ethical Guidelines confirmed?"
                    fieldType={FormFieldType.CHECKBOX}
                  />
                </div>
                <div className=" flex w-1/2 px-2 py-1">
                  <CustomFormField
                    control={form.control}
                    name="consent_forms_attached"
                    fieldType={FormFieldType.CHECKBOX}
                    label="Consent Forms Signed and Attached?"
                  />
                </div>
              </div>
              <div className=" flex  items-center justify-center  ">
                <CustomFormField
                  control={form.control}
                  name="submitted_by"
                  label="Submitted By"
                  placeholder="Submitted By"
                  fieldType={FormFieldType.INPUT}
                />{" "}
                <CustomFormField
                  control={form.control}
                  name="approval_by"
                  label="Approved By"
                  placeholder="Approved By"
                  fieldType={FormFieldType.INPUT}
                />
              </div>
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

export default SpecimenSubmissionForm;
