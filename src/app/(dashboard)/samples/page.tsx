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

import Link from "next/link";

import SampleUpload from "~/components/SampleUpload";
import { getSamples } from "~/server/samples";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Paths } from "~/lib/constants";
const SamplesPage = () => {
  async function Samples() {
    const samples = await getSamples();

    // interface ProjectsProps {
    //     projects: any;
    //   }
    return (
      <div className=" h-full w-full  rounded-lg  p-4 ">
        <DataTable columns={columns} data={samples} />
      </div>
    );
  }

  return (
    <div className="h-full w-full   ">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="items-center  ">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold">Samples</h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">All Samples</p>
        </div>
        <div className="flex  items-center justify-end gap-4 border-4">
          <Link
            href={Paths.SamplesCreate}
            className="flex h-10  items-center justify-center bg-primary 
             px-4  text-white hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-300"
          >
            <Plus color="white" />
          </Link>
          <SampleUpload />
        </div>
      </div>

      <Samples />
    </div>
  );
};

export default SamplesPage;
