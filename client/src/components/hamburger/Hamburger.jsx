import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link } from "react-router-dom";
export default function HamburgerMenu (){
    return (
        <section class="top-nav">
   
    <input id="menu-toggle" type="checkbox" />
    <label class='menu-button-container' for="menu-toggle">
    <div class='menu-button'></div>
  </label>
    <ul class="menu">
      <li><Link to="/tasks">
        <HomeOutlinedIcon />
        </Link></li>
      <li><Link to="/profile">
        <PersonOutlinedIcon />
        </Link></li>
      <li><Link to="/feed" title="Feed">
        <GridViewOutlinedIcon />
        </Link></li>
      <li><Link to="/settings">
        <SettingsIcon  />
        </Link></li>
    </ul>
  </section>
    )
}