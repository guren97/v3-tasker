import { createBrowserRouter, RouterProvider } from "react-router-dom";

// rtk -> store
import { Provider } from "react-redux";
import store from "./redux/store.js";

// main layout
import Layout from "./pages/Layout.jsx";

// public routes
import Home from "./pages/Public/Home.jsx";
import Login from "./pages/Public/Login.jsx";
import Signup from "./pages/Public/Signup.jsx";

// protected routes
import PrivateRoute from "@/components/PrivateRoute";
import Dashboard from "./pages/Protected/Dashboard.jsx";
import Profile from "./pages/Protected/Profile.jsx";

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
    // Protected Routes
    {
      path: "/",
      element: <PrivateRoute />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
};

export default App;
