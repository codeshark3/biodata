import { Poppins } from "next/font/google";

import { cn } from "~/lib/utils";

const PoppinsRegular = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

interface HeaderProps {
  title: string;
}
export const FormHeader = ({ title }: HeaderProps) => {
  return (
    <div className="flex h-10 w-full flex-col items-center justify-center gap-y-2 bg-primary py-2">
      <h1
        className={cn(
          PoppinsRegular.className,
          "text-2xl font-medium text-white",
        )}
      >
        {title}
      </h1>
    </div>
  );
};
