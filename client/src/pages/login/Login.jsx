import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";


const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const [btnStatus, setBtnStatus] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login, userState } = useContext(AuthContext);
  const { errMsg } = userState

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };
useEffect(()=>{ if(inputs.username === "" || inputs.password === ""){
    setBtnStatus(true)
}else{
  setBtnStatus(false)
}}, [inputs])
 



  return (
    <div className="login">
      <div className="card">
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <div>
            {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
              <button onClick={handleLogin} disabled={btnStatus}>{btnStatus ? "Enter username and password" : "Login"}</button>
              <span className="loginForgot">Forgot Password?</span>
            </div>

            <div className="switch">
              <span>Not a member?</span>
              <Link to="/register">
                <button>Click Here</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
