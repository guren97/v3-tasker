import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "sonner";
import Navbar from "./NavigationBar/Navbar";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main className="px-12 p-4">
        <Outlet />
        <Toaster />
      </main>
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
