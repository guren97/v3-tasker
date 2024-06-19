import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/redux/slices/usersApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";

import { toast } from "sonner";

// zod - form
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// form ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // login api
  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values) => {
    try {
      // Call login API mutation
      const res = await login({ ...values }).unwrap();

      // Dispatch action to set user credentials in Redux store
      dispatch(setCredentials({ ...res }));

      // Navigate to dashboard page on successful login
      navigate("/dashboard");
    } catch (err) {
      let errorMessage = "An error occurred"; // Default error message

      // Check if error response contains an 'error' field
      if (err && err.data && err.data.error) {
        errorMessage = err.data.error;
      }

      // Display error toast message
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md mx-4 bg-white border p-6 rounded-md shadow-sm">
        <Form {...form}>
          <div className="mb-8">
            <FormLabel className="text-2xl">Login to you account</FormLabel>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
