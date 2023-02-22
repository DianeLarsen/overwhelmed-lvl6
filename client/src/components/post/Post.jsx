import "./post.scss";



import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default function Post({post}){
  const { userState } = useContext(AuthContext);
  const { user } = userState;
 // TEMP


  return (
    <div className="post">
      {user.name}
    </div>
  );
};


