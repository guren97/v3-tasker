import { createBrowserRouter, RouterProvider } from "react-router-dom";

// MAIN LAYOUT
import Layout from "./pages/layout/Layout.jsx";

// PUBLIC ROUTES
import Home from "./pages/public/home/Home.jsx";
import Login from "./pages/public/login/Login.jsx";
import Signup from "./pages/public/signup/Signup.jsx";

// PRIVATE ROUTES

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
    
    // {
    //   path: "/",
    //   element: <PrivateRoute />,
    //   children: [
    //     {
    //       path: "/dashboard",
    //       element: <Dashboard />,
    //     },
    //     {
    //       path: "/profile",
    //       element: <Profile />,
    //     },
    //   ],
    // },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
