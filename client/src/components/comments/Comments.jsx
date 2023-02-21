import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";


import moment from "moment";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);



  return (
    <div className="comments">
      
    </div>
  );
};

export default Comments;
