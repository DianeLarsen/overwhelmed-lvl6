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
import React, { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import HamburgerMenu from "../hamburger/Hamburger";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);

  const { userState, logout } = useContext(AuthContext);
  const { user } = userState;
  const { name, profilePicture } = user;
  const [notifications, setNotifications] = useState(2);
  const textInput = React.useRef(null);

  const setFocus = React.useCallback(() => { textInput.current.focus() });

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
      <div className="search" onClick={setFocus} tabindex="-1">
        <SearchOutlinedIcon />
        <input className="searchInput"ref={textInput}type="text" placeholder="Search..." />
      </div>
      <div className="right">
        <input id="menu-toggle" type="checkbox" />
        <label class="menu-button-container" for="menu-toggle">
          <div class="menu-button"></div>
        </label>
        <ul class="menu">
          <li>
            <Link
              className="link user"
              to="/profile"
              style={{ textDecoration: "none" }}
            >
              <img src={profilePicture} alt="" />
            </Link>
            <span>{name}</span>
          </li>
          <li>
            <Link className="link" to="/feed" title={`You have ${notifications} notifications.`} >
            <NotificationsOutlinedIcon />
            </Link>
            <span>Notifications</span>
          </li>
          <li>
            <Link className="link" to="/tasks">
              <HomeOutlinedIcon />
            </Link>
            <span>Tasks</span>
          </li>
         
          <li>
            <Link className="link" to="/settings">
              <SettingsIcon />
            </Link>
            <span>Settings</span>
          </li>
          <li>
           
            <button onClick={logout}>
              <LogoutIcon />
            </button>

            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
