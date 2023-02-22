import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";


const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { userState, logout } = useContext(AuthContext);
const { user } = userState
const { name } = user

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/welcome" style={{ textDecoration: "none" }}>
          <span>Overwhelmed</span>
        </Link>
        <Link to="/tasks">
        <HomeOutlinedIcon />
        </Link>
        <div title={darkMode ? "Click for Light Theme" : "Click for Dark Theme"}>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle}  style={{cursor: "pointer", color:"yellow"}}/>
        ) : (
          <DarkModeOutlinedIcon onClick={toggle}  style={{cursor: "pointer"}}/>
        )}
        </div>
         <Link to="/feed" title="Feed">
        <GridViewOutlinedIcon />
        </Link>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <Link to="/profile">
        <PersonOutlinedIcon />
        </Link>
        <Link to="/settings">
        <SettingsIcon  />
        </Link>
        <NotificationsOutlinedIcon />
        <div className="user">
          {/* <img
            src={"/upload/" + userState.profilePic}
            alt=""
          /> */}
          <span>{name}</span>

        </div>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
