import { Poppins } from "next/font/google";

import { cn } from "~/lib/utils";

const PoppinsRegular = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

interface HeaderProps {
  title: string;
}
export const Header = ({ title }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1 className={cn(PoppinsRegular.className, "text-3xl font-medium")}>
        {title}
      </h1>
    </div>
  );
};
