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

import { Plus } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import SampleUpload from "~/components/SampleUpload";

const SamplesPage = () => {
  return (
    <div className="h-full w-full   ">
      <div>
        <div className="flex items-center justify-between px-4">
          <div className="items-center  ">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold">Projects</h2>
            </div>

            <p className="mt-1 text-sm text-gray-500">All Projects</p>
          </div>
          <SampleUpload />
          {/* <Button className="btn-primary h-10 w-40 items-center justify-center">
          <Plus />
          <Link href="/samp/new">Create Project</Link>
        </Button> */}
        </div>
      </div>
    </div>
  );
};

export default SamplesPage;
