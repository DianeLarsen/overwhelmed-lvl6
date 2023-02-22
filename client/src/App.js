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
import Tasks from "./pages/tasks/Tasks";
import Settings from "./pages/settings/Settings";
import { DarkModeContext } from "./context/darkModeContext";


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
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/tasks",
          element: <Tasks />,
        },
        {
          path: "/feed",
          element: <Feed />,
        }
      ],
    },
   { path: "/",
   element: (
      <WelcomeLayout />
    
   ), 
   children: [{
      path: "/welcome",
      element: <Welcome token={token}/>,
    },
    {
      path: "/login",
      element: token ? <Navigate to="/tasks" /> : <Login />,
    },
    {
      path: "/register",
      element: token ? <Navigate to="/tasks" /> : <Register />,
    }],}
  ]);
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
