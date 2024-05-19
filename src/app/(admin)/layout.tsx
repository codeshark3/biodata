import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Biodata",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} `}>
        <Sidebar />
        <main className="grid h-full w-full  pl-[300px]">
          <Navbar />
          <div className="flex h-full w-full items-center justify-center  p-4">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
