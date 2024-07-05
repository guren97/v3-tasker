import { useEffect } from "react";
import { useFetchUserQuery } from "@/redux/slices/usersApiSlice";

const Profile = ({ userId }) => {
  const { data: user, error, isLoading } = useFetchUserQuery(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h2>User Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Render other user details */}
        </div>
      ) : (
        <div>User not found</div>
      )}
    </div>
  );
};

export default Profile;
