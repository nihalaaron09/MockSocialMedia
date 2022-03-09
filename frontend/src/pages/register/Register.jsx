import "./register.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { registerCall } from "../../apiCalls";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();

  const URL = process.env.REACT_APP_BACKEND_URL;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      password.current.setCustomValidity("Passwords don't match!");
    } else {
      const newUser = {
        username: username.current.value,
        password: password.current.value,
        email: email.current.value,
      };
      try {
        const res = await axios.post(URL + "/api/auth/register", newUser);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  //api call to post new user
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">AntiSocial</h3>
          <span className="loginDescription">
            Connect with friends all over the globe.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleRegister}>
            <input
              required
              ref={username}
              placeholder="Username"
              className="loginInput"
            />
            <input
              type="email"
              required
              ref={email}
              placeholder="Email"
              className="loginInput"
            />
            <input
              required
              type="password"
              ref={password}
              placeholder="Password"
              className="loginInput"
            />
            <input
              type="password"
              required
              minLength="6"
              ref={confirmPassword}
              placeholder="Confirm password"
              className="loginInput"
            />
            <button type="submit" className="loginButton">
              Sign Up
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "500",
                }}
                to="/login"
              >
                Log In
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
