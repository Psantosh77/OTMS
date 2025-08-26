import React from "react";
import { Link } from "react-router-dom";
import "./Login.css"; 

function Login() {
  return (
    <>
      <div className="section">
        <div className="login-body">
          <div className="login-container">
            <h2>Login</h2>
            <form>
              <input type="email" placeholder="Enter Email" required />
              <input type="password" placeholder="Enter Password" required />
              <button type="submit" className="login-btn">
                <Link to="/dashboard">Login</Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
