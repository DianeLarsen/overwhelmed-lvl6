import { Link } from "react-router-dom";
import "./welcome.scss";

export default function Welcome(props){

const { token } = props
 

  return (
    
    
    <div className="welcome">
      <div className="card">
        <div className="left">
          <h1>Overwhelemed?</h1>
          <p>
            We are here to help.  Custom task lists that fit your availability and lifestyle.
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


