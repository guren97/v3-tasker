import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "@/components/NavigationBar/Navbar";

const Layout = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main className="px-12 p-4">
        <Outlet />
        <Toaster />
      </main>
    </div>
  );
};

export default Layout;
