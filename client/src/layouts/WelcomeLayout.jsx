import { Outlet } from "react-router-dom";
import WelcomeNav from "../components/welcomeNav/WelcomeNav";

export default function WelcomeLayout() {
  return (
    <div className="login-layout">
      <WelcomeNav />
   
     <Outlet />
    </div>
  );
}
