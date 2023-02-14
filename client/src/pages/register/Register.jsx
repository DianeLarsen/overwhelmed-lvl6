import { Link } from "react-router-dom";
import "./register.scss";

export default function Register() {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="text" placeholder="Name" />
            <button>Register</button>
          </form>
        </div>
        <div className="right">
          <h1>Need Help?</h1>
          <p>
            You came to the right place, we tailor your tasks to your needs.
          </p>
          <span>Already a member?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
