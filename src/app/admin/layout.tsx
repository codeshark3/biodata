import Navbar from "~/app/admin/Navbar";
import Sidebar from "~/app/admin/Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    //   <div className="flex h-full items-center justify-center">{children}</div>
    <div>
      <Sidebar />
      <main className="grid h-full w-full gap-4 pl-[300px]">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
