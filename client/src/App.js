import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
    Navigate,
} from "react-router-dom";

import Feed from "./pages/feed/Feed";
import Welcome from "./pages/welcome/Welcome";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext } from "react";


import AppLayout from "./layouts/AppLayout";
import WelcomeLayout from "./layouts/WelcomeLayout"

import { AuthContext } from "./context/authContext";

function App() {
  const { userState: {token} } = useContext(AuthContext);



  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" />;
    } 

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Feed />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
   { path: "/",
   element: (
      <WelcomeLayout />
    
   ), 
   children: [{
      path: "/welcome",
      element: <Welcome />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    }],}
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
