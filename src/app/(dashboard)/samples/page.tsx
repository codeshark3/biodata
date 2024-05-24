// "use client";

// import { useForm } from "react-hook-form";
// import { useState, useTransition } from "react";
// import Link from "next/link";

// import { redirect } from "next/navigation";
// import { Paths } from "~/lib/constants";
// import { Input } from "~/components/ui/input";
// import { processxlsx } from "~/server/data/upload";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
//   FormControl,
// } from "~/components/ui/form";
// import { Button } from "~/components/ui/button";
// import { FormError } from "~/components/FormError";
// import { FormSuccess } from "~/components/FormSuccess";

// import { useRouter } from "next/navigation";
// type FormData = {
//   file: FileList;
// };
// const SamplesPage = () => {
//   const [error, setError] = useState<string | undefined>("");
//   const [success, setSuccess] = useState<string | undefined>("");
//   const [isPending, startTransition] = useTransition();
//   const router = useRouter();

//   // const form = useForm({
//   //   defaultValues: { file: "" },
//   // });
//   const form = useForm<FormData>({
//     defaultValues: { file: new DataTransfer().files },
//   });

//   const onSubmit = (data: FormData) => {
//     if (data.file.length === 0) {
//       setError("No file selected");
//       return;
//     }
//     setError("");
//     setSuccess("");
//     startTransition(() => {
//       processxlsx(data.file[0])
//         .then((data) => {
//           setError(data.error);
//           setSuccess(data.success);

//           if (data.success) {
//           }
//         })
//         .catch((err) => {
//           console.error(err);
//           setError("An error occurred ");
//         });
//     });
//   };

//   return (
//     <>
//       <Button>
//         <Link href="./samples/create/">Create</Link>
//       </Button>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <div className="space-y-4">
//             <FormField
//               control={form.control}
//               name="file"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>file</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       disabled={isPending}
//                       type="file"
//                       onChange={(e) => field.onChange(e.target.files)}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <FormError message={error} />
//           <FormSuccess message={success} />
//           <Button type="submit" className=" w-full" disabled={isPending}>
//             upload
//           </Button>
//         </form>
//       </Form>
//     </>
//   );
// };

// export default SamplesPage;

"use client";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import XLSX from "xlsx";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
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
import { json } from "stream/consumers";
import { addSamples } from "~/server/samples";

type FormData = {
  file: FileList | null;
};

const SamplesPage = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [jsonData, setJsonData] = useState<any[]>([]);

  const router = useRouter();

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
      <Button>
        <Link href="./samples/create/">Create</Link>
      </Button>
      <div className="flex w-full flex-col space-y-4  border-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
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
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Upload
            </Button>
          </form>
        </Form>

        <div className="flex flex-col space-y-4 border-4 ">
          {/* {jsonData.map((row) => (
            // <div key={row.id}>
            //   <p>{row.id}</p>
            //   <p className=" text-red-800">{row.name}</p>
            //   <p>{row.value}</p>
            // </div>
          ))} */}
        </div>
      </div>
    </>
  );
};

export default SamplesPage;
