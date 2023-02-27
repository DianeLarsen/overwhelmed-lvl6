import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import CloudinaryUploadWidget from "../../Widget/CloudinaryUploadWidget";

// import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

import { useState } from "react";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { userState, setSettings } = useContext(AuthContext);

 

  return (
    <div className="profile">
      
          <div className="images">
          <CloudinaryUploadWidget setSettings={setSettings} />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{userState.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{userState.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{userState.website}</span>
                  </div>
                </div>
               
                  <button >Follow
                    {/* {relationshipData.includes(userState.id)
                      ? "Following"
                      : "Follow"} */}
                  </button>
                
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts />
          </div>
        
      
      
    </div>
  );
};

export default Profile;
