import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// UI components
import Profile from "../NavProfile/profile";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// Icons
import { IoMenuOutline, IoExitOutline } from "react-icons/io5";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <nav className="fixed w-full bg-white shadow-sm z-10 flex justify-between items-center px-10 py-4">
      {/* Left Side */}
      <div>
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-1">
            <NavigationMenuItem>
              <Link to="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} hover:text-blue-600 transition-colors duration-300`}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {userInfo && (
              <NavigationMenuItem>
                <Link to="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} hover:text-blue-600 transition-colors duration-300`}
                  >
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        <Profile />
        <Sheet>
          <SheetTrigger className="flex items-center">
            <IoMenuOutline className="text-3xl cursor-pointer hover:text-blue-600 transition-colors duration-300" />
          </SheetTrigger>
          <SheetContent className="p-6">
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold">
                Are you absolutely sure?
              </SheetTitle>
              <SheetDescription className="mt-2 text-gray-600">
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
