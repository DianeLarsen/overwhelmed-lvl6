
import { Link } from "react-router-dom";

import "./start.scss";


const LearnMore = () => {


  return (
    <>
    
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
         
          </Link>
          <Link to="/login">
            <button>Login</button>
         
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default LearnMore;