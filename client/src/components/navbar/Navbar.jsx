import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/redux/slices/usersApiSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../../redux/slices/authSlice";

import { IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import { NavLink, MobileNavLink } from "./NavLinks.jsx";
import { Button } from "../ui/button.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // Call logout function from API mutation
  const [logoutApi] = useLogoutMutation();

  // This section checks if there is a user
  const { userInfo } = useSelector((state) => state.auth);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = async () => {
    try {
      // Dispatch the logout action to update Redux state
      dispatch(logoutAction());

      // Call the logout API
      await logoutApi();

      // Navigate to the home page
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="flex justify-between items-center px-4 md:px-16 bg-slate-950 h-16 dark:text-white">
      <div className="left">
        <Link>LOGO</Link>
      </div>
      <div className="md:hidden">
        <button
          type="button"
          onClick={handleClick}
          className="text-white focus:outline-none"
        >
          {isOpen ? <IoCloseSharp /> : <IoMenuSharp />}
        </button>
      </div>
      <div className="hidden md:block">
        <ul className="flex space-x-4 items-center">
          {userInfo ? (
            <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <Button onClick={logoutHandler}>Logout</Button>
            </>
          ) : (
            <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Signup</NavLink>
            </>
          )}
        </ul>
      </div>

      {isOpen && (
        <div className="md:hidden absolute z-10 top-16 inset-x-0 bg-slate-900 h-full">
          <ul className="flex flex-col">
            {userInfo ? (
              <>
                <MobileNavLink to="/" onClick={handleClick}>
                  Home
                </MobileNavLink>
                <MobileNavLink to="/dashboard" onClick={handleClick}>
                  Dashboard
                </MobileNavLink>
                <Button onClick={logoutHandler}>Logout</Button>
              </>
            ) : (
              <>
                <MobileNavLink to="/" onClick={handleClick}>
                  Home
                </MobileNavLink>
                <MobileNavLink to="/login" onClick={handleClick}>
                  Login
                </MobileNavLink>
                <MobileNavLink to="/signup" onClick={handleClick}>
                  Signup
                </MobileNavLink>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
