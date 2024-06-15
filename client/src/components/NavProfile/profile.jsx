import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//LOGOUT
import { useLogoutMutation } from "@/redux/slices/usersApiSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../../redux/slices/authSlice";

import { IoPersonCircleSharp } from "react-icons/io5";

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
  const lastName = userInfo?.user?.last_Name || "";
  const email = userInfo?.user?.email;
  const fullname = `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${
    lastName.charAt(0).toUpperCase() + lastName.slice(1)
  }`;

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
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {userInfo ? (
            avatar ? (
              <>
                <Avatar>
                  <AvatarImage src={avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </>
            ) : (
              <>
                <Avatar>
                  <AvatarImage
                    src={avatar ? avatar : "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </>
            )
          ) : (
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
          )}
        </DropdownMenuTrigger>

        <div className=" ">
          <DropdownMenuContent className="absolute right-2 top-0">
            <DropdownMenuLabel>{fullname}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logoutHandler}>Signout</DropdownMenuItem>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;
