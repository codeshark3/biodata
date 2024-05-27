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

import { toast } from "~/components/ui/use-toast";
type FormData = {
  file: FileList | null;
};

const SampleUpload = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [jsonData, setJsonData] = useState<any[]>([]);
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
      setJsonData(jsonData);
      // console.log("JSON Data:", jsonData);

      setError("");
      setSuccess("");
      startTransition(() => {
        addSamples(jsonData)
          .then((data) => {
            setError(data.error);
            setSuccess(data.success);
            if (data.success) {
              toast({
                // title: { success },
                description: "Samples uploaded successfully",
                variant: "success",
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

      // Now send the JSON data to the server
      // const response = await fetch("/api/upload", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ data: jsonData }),
      // });

      // const result = await response.json();

      // if (result.error) {
      //   setError(result.error);
      // } else {
      //   setSuccess(result.success);
      // }
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
      <div className="flex w-full items-center justify-center space-y-4 border-4  border-emerald-800">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center justify-center space-y-6 border-2 border-red-800"
          >
            <div className="flex w-2/3 space-x-2 border-2 border-blue-800">
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-1/3" disabled={isPending}>
                Upload
              </Button>
            </div>

            {/* <FormError message={error} />
            <FormSuccess message={success} /> */}
          </form>
        </Form>

        {/* <div className="flex flex-col space-y-4 border-4 "></div> */}
      </div>
    </>
  );
};

export default SampleUpload;
