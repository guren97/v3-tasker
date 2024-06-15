import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/redux/slices/usersApiSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../../redux/slices/authSlice";

import { IoMenuSharp, IoCloseSharp, IoMenuOutline } from "react-icons/io5";
import { NavLink, MobileNavLink } from "./NavLinks.jsx";
import { IoExitOutline } from "react-icons/io5";
import Profile from "../NavProfile/profile";
import { Button } from "../ui/button";

// Navigation menu
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

//Drawer
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

// Toggle switch
import { Switch } from "@/components/ui/switch";

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
    <>
      <nav className="bg-slate-50 p-2 px-4   ">
        <Drawer direction="right">
          {/*   NAVIGATION MENU */}
          <div>
            <div className="flex justify-between items-center">
              {/* LEFT  */}
              <div>
                {" "}
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem className=" ">
                      <Link to="/" legacyBehavior>
                        <NavigationMenuLink
                          className={` bg-slate-900 text-black ${navigationMenuTriggerStyle()}`}
                        >
                          Home
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>

                    {userInfo && (
                      <NavigationMenuItem className=" ">
                        <Link to="/dashboard" legacyBehavior>
                          <NavigationMenuLink
                            className={` bg-slate-900 text-black ${navigationMenuTriggerStyle()}`}
                          >
                            Dashboard
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    )}

                    <NavigationMenuItem className=" ">
                      <Link to="#" legacyBehavior>
                        <NavigationMenuLink
                          className={` bg-slate-900 text-black ${navigationMenuTriggerStyle()}`}
                        >
                          Documentation
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              {/* RIGHT  */}
              <div>
                <div className="right flex items-center space-x-4">
                  <div>
                    {userInfo ? (
                      <>
                        <div className="flex items-center space-x-4">
                          <div>
                            <Profile />
                          </div>
                          {/* <div>
                            <Switch />
                          </div> */}
                          <div>
                            <DrawerTrigger>
                              <IoMenuOutline className="text-slate-800 text-4xl" />
                            </DrawerTrigger>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <NavigationMenu>
                          <NavigationMenuList>
                            <NavigationMenuItem>
                              <Link to="/login" legacyBehavior passHref>
                                <NavigationMenuLink
                                  className={`h-8 rounded-sm bg-zinc-900  text-slate-100 hover:bg-zinc-700 hover:text-slate-100 ${navigationMenuTriggerStyle()} `}
                                >
                                  Login
                                </NavigationMenuLink>
                              </Link>
                            </NavigationMenuItem>
                          </NavigationMenuList>
                        </NavigationMenu>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* SIDEBAR DRAWER */}

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </nav>
    </>
  );
};

export default Navbar;
