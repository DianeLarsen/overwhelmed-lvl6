import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import { AuthContext } from "../../context/authContext.js";
import validator from "validator";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from '@mui/icons-material/Cancel';

const Register = () => {
  const { register, userState } = useContext(AuthContext);
  const [emailError, setEmailError] = useState("");
  
  const [emailText, setEmailText] = useState("");
  function validateEmail(e) {
    var email = e.target.value;

    if (!validator.isEmail(email)) {
      setEmailError(<CancelIcon  style={{
        color: "red" 
      }}/>);
      
      setEmailText("Invalid email address")
    } else {
      
      setEmailText("Valid email address")
      setEmailError(<CheckCircleOutlineIcon  style={{
        color: "green"
      }}/>);
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }
  const { errMsg } = userState;
  const [btnStatus, setBtnStatus] = useState(true);
  const [btnText, setBtnText] = useState("Complete the above fields");
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [passwordAgain, setPasswordAgain] = useState("");
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePWChange = (e) => {
    setPasswordAgain(e.target.value);
  };

  function handleClick(e) {
    e.preventDefault();
    register(inputs);
  }
  useEffect(() => {
    if (passwordAgain !== inputs.password) {
      setBtnStatus(true);
      setBtnText("Passwords do not match");
    } else if (
      inputs.password === "" ||
      inputs.name === "" ||
      inputs.username === "" ||
      inputs.email === "" ||
      passwordAgain === ""
    ) {
      setBtnStatus(true);
      setBtnText("Missing Fields");
    } else if (inputs.password.length < 6) {
      setBtnText("Password too short must be 6 characters or longer");
    } else {
      setBtnStatus(false);
      setBtnText("Submit");
    }
  }, [inputs, passwordAgain]);
  function validate(email, password, name, passwordAgain, username) {
    // true means invalid, so our conditions got reversed
    return {
      email: email.length === 0,
      password: password.length < 6,
      name: name.length === 0,
      passwordAgain: passwordAgain.length === 0,
      username: username.length === 0,
    };
  }
  const errors = validate(
    inputs.email,
    inputs.password,
    inputs.name,
    passwordAgain,
    inputs.username
  );

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
              required
              className={errors.username ? "error" : ""}
            />
            <div className="emailDiv">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => validateEmail(e)}
              required
              className={errors.email ? "error" : ""}
            />
            {emailError && <span
             title={emailText}
            >
              {emailError}
            </span>}
            </div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              minLength={6}
              required
              className={errors.password ? "error" : ""}
            />
            <input
              placeholder="Password Again"
              required
              type="password"
              onChange={handlePWChange}
              minLength={6}
              className={errors.passwordAgain ? "error" : ""}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              className={errors.name ? "error" : ""}
            />
            {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
            <button disabled={btnStatus} onClick={handleClick}>
              {btnText}
            </button>
          </form>
          <div className="switch">
            {" "}
            <span>Already a member?</span>
            <Link to="/login">
              <button>Click Here</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
