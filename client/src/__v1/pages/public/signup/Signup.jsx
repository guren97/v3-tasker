import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../../redux/slices/usersApiSlice";
import { setCredentials } from "../../../redux/slices/authSlice";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await register({ ...formData }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard");
      toast.success("Created successfully");
    } catch (err) {
      let errorMessage = "An error occurred";
      if (err && err.data && err.data.error) {
        errorMessage = err.data.error;
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center border-red-500 px-4 py-8 lg:px-8 xl:px-16">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up for a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="sm:flex sm:space-x-4">
              <div className="sm:w-1/2">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <Input
                    id="first_name"
                    name="first_name"
                    type="text"
                    autoComplete="first_name"
                    required
                    value={formData.first_name}
                    onChange={handleChange}
                    className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:w-1/2">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    autoComplete="last_name"
                    required
                    value={formData.last_name}
                    onChange={handleChange}
                    className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <Button className="w-full">
                {isLoading ? "Loading..." : " Sign up"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
