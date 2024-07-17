"use client";
import React, { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Control, Controller } from "react-hook-form";
import FormFieldComponent from "./FormFieldComponent";

interface FormCheckboxComponentProps {
  control: Control<any>;
  name: string;
  label: string;
  isPending: boolean;
}

// const SampleDialog = ({ open, onClose }: any) => {
//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Enter Number of Samples</DialogTitle>
//           <DialogDescription>
//             <FormFieldComponent
//               control={control}
//               name="no_stool"
//               label="Number of Stool Samples"
//               placeholder="Number of Stool Samples"
//               type="number"
//               isPending={false}
//             />
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// };

const FormCheckboxComponent: React.FC<FormCheckboxComponentProps> = ({
  control,
  name,
  label,
  isPending,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const handleCheckboxChange = (checked) => {
  //   setIsDialogOpen(checked);
  // };

  // const handleCloseDialog = () => {
  //   setIsDialogOpen(false);
  // };

  return (
    <FormField
      control={control}
      name={name} // Pass the actual name of the field
      render={({ field }) => (
        <FormItem>
          <div className="flex items-start justify-start space-x-4">
            <FormLabel className="whitespace-nowrap">{label}</FormLabel>
            <FormControl>
              <Input
                type="checkbox"
                className="h-4"
                disabled={isPending}
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  // handleCheckboxChange(e.target.checked);
                }}
                name={field.name}
                ref={field.ref}
              />
            </FormControl>
          </div>
          {/* {isDialogOpen && (
            <SampleDialog open={isDialogOpen} onClose={handleCloseDialog} />
          )} */}
          {}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormCheckboxComponent;

// "use client";
// import React,{ useState } from "react";
// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "~/components/ui/form";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "~/components/ui/dialog";
// import { Input } from "~/components/ui/input";
// import { Control, Controller } from "react-hook-form";
// // import { SampleDialog } from "../SampleDialog";
// import FormFieldComponent from "./FormFieldComponent";
// interface FormCheckboxComponentProps {
//   control: Control<any>;
//   name: string;
//   label: string;
//   isPending: boolean;
// }

// // const SamplesPage = () => {
// //   // interface ProjectsProps {
// //   //     projects: any;
// //   //   }
// //   return <FormFieldComponent />;
// // };
// const SampleDialog = ({ open, sample }: any) => {

//   return (
//     <Dialog open={open}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Are you absolutely sure?</DialogTitle>
//           <DialogDescription>
//             This action cannot be undone. This will permanently delete your
//             account and remove your data from our servers.
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// };
// const FormCheckboxComponent: React.FC<FormCheckboxComponentProps> = ({
//   control,
//   name,
//   label,
//   isPending,
// }) => {
//   return (
//     <FormField
//       control={control}
//       name={name} // Pass the actual name of the field
//       render={({ field }) => (
//         <FormItem>
//           <div className="flex items-start justify-start space-x-4">
//             <FormLabel className="whitespace-nowrap ">{label}</FormLabel>
//             <FormControl>
//               <Input
//                 type="checkbox"
//                 className="h-4 "
//                 disabled={isPending}
//                 checked={field.value}
//                 onChange={(e) => field.onChange(e.target.checked)}
//                 name={field.name}
//                 ref={field.ref}
//               />
//             </FormControl>
//           </div>

//           {field.value && <SampleDialog open={true} sample={field.value} />}
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// };

// export default FormCheckboxComponent;
