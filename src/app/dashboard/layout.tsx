import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    //   <div className="flex h-full items-center justify-center">{children}</div>
    <div>
      <Sidebar />
      <main className="grid h-full w-full  pl-[300px]">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
