"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "~/components/ui/form";
import { FormError } from "~/components/FormError";
import { FormSuccess } from "~/components/FormSuccess";
import { addSamples } from "~/server/samples";
import XLSX from "xlsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import Link from "next/link";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { ZodError } from "zod";
import { SampleSchema } from "~/schemas";
import { toast } from "~/components/ui/use-toast";

type FormData = {
  file: FileList | null;
};

const SampleUpload = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [jsonSampleData, setJsonSampleData] = useState<any[]>([]);
  const router = useRouter();

  //   const { toast } = useToast();

  const form = useForm<FormData>({
    defaultValues: { file: null },
  });

  const onSubmit = async (data: FormData) => {
    if (!data.file || data.file.length === 0) {
      setError("No file selected");
      return;
    }

    const file = data.file[0];

    try {
      const fileData = await readFile(file);
      const workbook = XLSX.read(fileData, { type: "array" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const validateJsonData = (jsonData: any[]) => {
        // Loop through each object in jsonData
        for (const data of jsonData) {
          try {
            // Validate the object against sampleSchema
            SampleSchema.parse(data);
          } catch (error) {
            // If validation fails, check if it's a ZodError
            if (error instanceof ZodError) {
              console.error("Validation Errors:", error.errors);
            } else {
              console.error("Validation Error:", error);
            }
            // Return false if validation fails
            return false;
          }
        }
        // If all objects pass validation, return true
        return true;
      };

      const isJsonDataValid = validateJsonData(jsonData);

      if (isJsonDataValid) {
        setJsonSampleData(jsonData);
        setError("");
        setSuccess("");
        startTransition(() => {
          addSamples(jsonSampleData)
            .then((data) => {
              setError(data.error);
              setSuccess(data.success);
              if (data.success) {
                toast({
                  // title: { success },
                  description: "Samples uploaded successfully",
                  variant: "default",
                  className: "bg-emerald-500 text-white font-bold ",
                });
              } else {
                toast({
                  // title: { error },
                  description: "An error occurred while uploading the samples",
                  variant: "destructive",
                });
              }
              // if (data.success) {
              //   window.location.reload();
              //   // router.replace(router.asPath).then(() => {

              //   // });
              //   router.push("/auth/login");
              // }
            })
            .catch((err) => {
              console.error(err);
              setError("An error occurred during logout.");
            });
        });
        // toast({
        //   title: "Samples uploaded successfully",
        //   description: "Samples uploaded successfully",
        //   variant: "default",
        //   className: "bg-emerald-500 text-white font-bold ",
        // });
        console.log("jsonData matches sampleSchema");
      } else {
        // console.log("jsonData does not match sampleSchema");
        toast({
          title: "Error Submitting Samples",
          description: "Check if excel file is valid",
          variant: "destructive",
          className: " text-white font-bold ",
        });
      }
    } catch (error) {
      console.error(error);

      setError("An error occurred while processing the file");
    }
  };

  const readFile = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex h-full  justify-end  "
        >
          <div className=" flex  items-center justify-center space-x-2">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>File</FormLabel> */}
                  <FormControl>
                    <Input
                      {...field}
                      type="file"
                      onChange={(e) => field.onChange(e.target.files)}
                      disabled={isPending}
                      value={undefined}
                      className="w-[500px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="h-10 w-40" disabled={isPending}>
              Upload
            </Button>
          </div>

          {/* <FormError message={error} />
            <FormSuccess message={success} /> */}
        </form>
      </Form>

      {/* <div className="flex flex-col space-y-4 border-4 "></div> */}
    </>
  );
};

export default SampleUpload;
