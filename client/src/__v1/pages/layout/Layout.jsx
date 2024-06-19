import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar.jsx";
import { useSelector } from "react-redux";

import { Toaster } from "sonner";
import { useEffect } from "react";
const Layout = () => {
  return (
    <>
      <div className=" relative">
        <nav>
          <Navbar />
        </nav>

        <main className="absolute w-full h-dvh p-4 bg-slate-100 rounded-b-lg top-16 ">
          <Outlet />
          <Toaster />
        </main>
      </div>
    </>
  );
};

const PrivateRoute = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return userInfo ? <Outlet /> : <Navigate to="/" replace />;
};

export { Layout, PrivateRoute };
