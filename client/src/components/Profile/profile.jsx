import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

const UserProfile = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApi, { isLoading }] = useLogoutMutation();
  const { userInfo } = useSelector((state) => state.auth);

  // const avatar = userInfo?.user?.avatar;
  const firstName = userInfo?.user?.first_name || "";

  const logoutHandler = async () => {
    try {
      dispatch(logoutAction());
      await logoutApi();
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="relative flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            onClick={toggleDropdown}
            id="dropdownUserAvatarButton"
            data-dropdown-toggle="dropdownAvatar"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 cursor-pointer"
          >
            <span className="sr-only">Open user menu</span>
            <IoPersonCircleSharp className="text-white text-4xl" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="absolute -right-3.5">
          <DropdownMenuLabel>{firstName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to={`/profile/${userInfo.user._id}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={logoutHandler}
            className="flex space-x-1 font-semibold text-red-700"
          >
            <span> {isLoading ? "Signing out" : "Signout"} </span>
            <IoExitOutline />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;
