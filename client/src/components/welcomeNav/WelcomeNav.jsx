import "./welcomeNav.scss";

import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

const WelcomeNav = () => {
  const {
    userState: { token },
    logout,
  } = useContext(AuthContext);

  return (
    <div className="welcomeNavbar">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Overwhelemd</span>
        </Link>
        
        {token && 
          <button onClick={logout}>logout</button>
         }
      
    </div>
  );
};

export default WelcomeNav;
