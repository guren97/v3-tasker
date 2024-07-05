import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "../Profile/profile";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import logo from "../../assets/logo_dark.png";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <nav className="bg-white relative w-full flex justify-between items-center py-2 px-12 border text-sm shadow-sm">
      {/* LEFT */}
      <div className="flex items-center">
        <div>
          <Link to="/">
            <img className="h-8 w-full" src={logo} alt="Logo" />
          </Link>
        </div>
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={`ml-4 ${navigationMenuTriggerStyle()}`}>
                  Home
                </Link>
              </NavigationMenuItem>
              {userInfo && (
                <NavigationMenuItem>
                  <Link
                    to="/dashboard"
                    className={navigationMenuTriggerStyle()}
                  >
                    Dashboard
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      {/* RIGHT */}
      <div className="relative">
        <div className="relative flex space-x-2">
          {userInfo ? (
            <Profile />
          ) : (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    to="/login"
                    className={`bg-slate-400 ${navigationMenuTriggerStyle()}`}
                  >
                    Login
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    to="/signup"
                    className={`border ${navigationMenuTriggerStyle()}`}
                  >
                    Signup
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
