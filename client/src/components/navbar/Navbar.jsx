import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-between items-center px-4 md:px-16 bg-slate-950 h-16 dark:text-white">
      <div className="left">LOGO</div>
      <div className="md:hidden">
        <button
          type="button"
          onClick={handleClick}
          className="text-white focus:outline-none"
        >
          {isOpen ? "Close" : "Open"}
        </button>
      </div>
      <div className="hidden md:block">
        <ul className="flex space-x-4 items-center">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </ul>
      </div>

      {isOpen && (
        <div className="md:hidden absolute z-10 top-16 inset-x-0 bg-slate-900 h-full">
          <ul className="flex flex-col">
            <MobileNavLink to="/" onClick={handleClick}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/login" onClick={handleClick}>
              Login
            </MobileNavLink>
            <MobileNavLink to="/signup" onClick={handleClick}>
              Signup
            </MobileNavLink>
          </ul>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ children, to, className }) => {
  return (
    <Link
      to={to}
      className={`block text-sm font-medium py-2 px-3 md:p-0 text-gray-100 rounded md:bg-transparent md:dark:bg-transparent ${className}`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ children, to, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block py-2 px-3 text-gray-100 hover:bg-slate-800"
    >
      {children}
    </Link>
  );
};

export default Navbar;
