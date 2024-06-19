import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Profile from "../Profile/profile";

// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
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
            <img className="h-8 w-full" src={logo} alt="" />
          </Link>
        </div>
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={` ml-4 ${navigationMenuTriggerStyle()}`}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      {/* RIGHT */}
      <div className="relative">
        <div className="relative flex space-x-2">
          {userInfo ? (
            <>
              <Profile />
            </>
          ) : (
            <>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem className="">
                    <Link className="" to="/login" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={`bg-slate-400 ${navigationMenuTriggerStyle()}`}
                      >
                        Login
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="">
                    <Link to="/signup" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={`border ${navigationMenuTriggerStyle()}`}
                      >
                        Signup
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
