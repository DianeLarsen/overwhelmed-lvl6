import { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import { AuthContext } from "../../context/authContext.js";


const Register = () => {
  const { register, err, currentUser } = useContext(AuthContext);
  
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const passwordRef = useRef()
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function handleClick (e){
    e.preventDefault();
         if (passwordRef.current.value !== inputs.password) {
        passwordRef.current.setCustomValidity("Passwords don't match!");
      } else {
        register(inputs)
      }
 };

  console.log(err)

  return (
    <div className="register">
      <div className="card">
        
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              placeholder="Password Again"
              required
              className="loginInput"
              type="password"
              ref={passwordRef}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
          <span>Already a member?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
