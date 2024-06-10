import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar.jsx";
// import Footer from "../../components/footer/Footer.jsx";
const Layout = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>

      <main className="h-dvh bg-gray-50  ">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
