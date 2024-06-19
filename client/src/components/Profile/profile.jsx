import { useState } from "react";
import { useNavigate } from "react-router-dom";

//LOGOUT
import { useLogoutMutation } from "@/redux/slices/usersApiSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../../redux/slices/authSlice";

import { IoPersonCircleSharp, IoExitOutline } from "react-icons/io5";

// Dropdown
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Avatar
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserProfile = () => {
  // set state of dropdown to false
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Call logout function from API mutation
  const [logoutApi] = useLogoutMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const avatar = userInfo?.user?.avatar;
  const firstName = userInfo?.user?.first_name || "";
  // const fullname = `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${
  //   lastName.charAt(0).toUpperCase() + lastName.slice(1)
  // }`;

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

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="relative  flex">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {userInfo && (
            <>
              <button
                onClick={toggleDropdown}
                id="dropdownUserAvatarButton"
                data-dropdown-toggle="dropdownAvatar"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                type="button"
              >
                <span className="sr-only">Open user menu</span>
                <IoPersonCircleSharp className="text-white text-4xl cursor-pointer" />
              </button>
            </>
          )}
        </DropdownMenuTrigger>

        <div className=" ">
          <DropdownMenuContent className=" absolute -right-3.5">
            <DropdownMenuLabel>{firstName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={logoutHandler}
              className="flex space-x-1 font-semibold text-red-700"
            >
              <span> Signout </span>
              <span>
                <IoExitOutline />
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;
