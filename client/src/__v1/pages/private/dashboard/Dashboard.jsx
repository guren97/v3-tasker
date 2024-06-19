import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-4">
        <h1 className="font-bold text-3xl text-center mb-8">Dashboard</h1>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* {postData.map((post, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="font-semibold text-xl mb-2">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>
          </div>
        ))} */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
