import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../../redux/slices/usersApiSlice";
import { setCredentials } from "../../../redux/slices/authSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();
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
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Call login API mutation
      const res = await login({ ...formData }).unwrap();

      // Dispatch action to set user credentials in Redux store
      dispatch(setCredentials({ ...res }));

      // Navigate to dashboard page on successful login
      navigate("/dashboard");
    } catch (err) {
      let errorMessage = ""; // Default error message

      // Check if error response contains an 'error' field
      if (err && err.data && err.data.error) {
        errorMessage = err.data.error;
      }

      // Display error toast message
      toast.error(errorMessage);
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center border-red-500 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <Input
                id="email"
                name="email" // Ensure this matches the key in formData
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                name="password" // Ensure this matches the key in formData
                type="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>
          </div>
          <div>
            <Button className="w-full">
              {isLoading ? "Loading..." : " Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({
  id,
  type,
  name,
  value,
  autoComplete,
  onChange,
  required,
  className,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      autoComplete={autoComplete}
      onChange={onChange}
      required={required}
      className={`px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
    />
  );
};

export default Login;
