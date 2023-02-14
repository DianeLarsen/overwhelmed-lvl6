import "./login.scss"
import { Link } from "react-router-dom"

export default function Login(){
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
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}