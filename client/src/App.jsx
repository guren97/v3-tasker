import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store.js";

// MAIN LAYOUT
import { Layout } from "./pages/layout/Layout.jsx";

// PRIVATE ROUTES LAYOUT
import { PrivateRoute } from "./pages/layout/Layout.jsx";

// PUBLIC ROUTES
import Home from "./pages/public/home/Home.jsx";
import Login from "./pages/public/login/Login.jsx";
import Signup from "./pages/public/signup/Signup.jsx";

// PRIVATE ROUTES
import Dashboard from "./pages/private/dashboard/Dashboard.jsx";

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
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "/",
      element: <PrivateRoute />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
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
