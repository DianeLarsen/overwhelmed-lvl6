import { Link } from "react-router-dom";
import "./welcome.scss";

export default function Welcome(props){

const { token } = props
 

  return (
    
    
    <div className="welcome">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          
         {!token && <> <Link to="/register">
            <button>Register</button>
         
          </Link>
          <Link to="/login">
            <button>Login</button>
         
          </Link></>}
        </div>
      </div>
    </div>
    
  );
};


