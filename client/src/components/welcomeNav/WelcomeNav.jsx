import "./welcomeNav.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import { Link } from "react-router-dom";


const WelcomeNav = () => {

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Overwhelemd</span>
        </Link>
        <HomeOutlinedIcon />
        
       
      </div>
    </div>
  );
};

export default WelcomeNav;
