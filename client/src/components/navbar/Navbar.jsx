import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import HamburgerMenu from "../hamburger/Hamburger";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);

  const { userState, logout } = useContext(AuthContext);
  const { user } = userState;
  const { name, profilePicture } = user;

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/welcome" style={{ textDecoration: "none" }}>
          <span>Overwhelmed</span>
        </Link>

        <div
          title={darkMode ? "Click for Light Theme" : "Click for Dark Theme"}
        >
          {darkMode ? (
            <WbSunnyOutlinedIcon
              onClick={toggle}
              style={{ cursor: "pointer", color: "yellow" }}
            />
          ) : (
            <DarkModeOutlinedIcon
              onClick={toggle}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>

        
      </div>
      <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      <div className="right">
        <input id="menu-toggle" type="checkbox" />
        <label class="menu-button-container" for="menu-toggle">
          <div class="menu-button"></div>
        </label>
        <ul class="menu">
          <li>
            <Link to="/profile">
              <div className="user">
                <img src={profilePicture} alt="" />
                <span>{name}</span>
              </div>
            </Link>
          </li>
          <li>
            {" "}
            <NotificationsOutlinedIcon />
            <span>Notifications</span>
          </li>
          <li>
            <Link to="/tasks">
              <HomeOutlinedIcon />
            </Link>
            <span>Tasks</span>
          </li>
          <li>
            <Link to="/feed" title="Feed">
              <GridViewOutlinedIcon />
            </Link>
            <span>Feed</span>
          </li>
          <li>
            <Link to="/settings">
              <SettingsIcon />
            </Link>
            <span>Settings</span>
          </li>
          <li>
            <button onClick={logout}>logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
