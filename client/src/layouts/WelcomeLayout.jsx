import { Outlet } from "react-router-dom";
import { useContext } from "react";
import Navbar from "../components/navbar/Navbar";
import WelcomeNav from "../components/welcomeNav/WelcomeNav";
import { AuthContext } from "../context/authContext";
export default function WelcomeLayout() {
  const { userState } = useContext(AuthContext);
  const { token } = userState;

  return (
    <div className="login-layout">
      {token ? <Navbar /> : <WelcomeNav />} 
   
     <Outlet />
    </div>
  );
}
