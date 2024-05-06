"use client";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const loginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const handleClick = () => {
    console.log("login Button clicked");
  };

  return (
    <span className="cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
};
