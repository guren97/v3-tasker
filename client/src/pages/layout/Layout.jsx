import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar.jsx";
import { useSelector } from "react-redux";

import { Toaster } from "sonner";
import { useEffect } from "react";
const Layout = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>

      <main className="h-dvh bg-gray-50  ">
        <Outlet />
        <Toaster />
      </main>
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
