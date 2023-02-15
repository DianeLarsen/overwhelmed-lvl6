import "./login.scss"
import { Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
export default function Login(){

    const {login} = useContext(AuthContext);
function handleLogin(){
    login()
}

    return(
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Overwhelemed?</h1>
                    <p>You came to the right place, we tailor your tasks to your needs.</p>
                    <span>Already a member?</span>
                    <Link to="/register">
                    <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form >
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}