import { Link } from "react-router-dom";
const NavLink = ({ children, to, className }) => {
  return (
    <Link
      to={to}
      className={`block text-sm font-medium py-2 px-3 md:p-0 text-gray-100 rounded md:bg-transparent md:dark:bg-transparent hover:text-gray-300 ${className}`}
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
      className="block py-2 px-3 text-gray-100 hover:bg-slate-800 hover:text-gray-300"
    >
      {children}
    </Link>
  );
};

export { NavLink, MobileNavLink };
