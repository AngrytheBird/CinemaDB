import axios from "axios";
import AuthContext from "../context/AuthProvider";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const [newUser, setNewUser] = useState({
    user: "",
    pwd: null,
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/auth", newUser);
      let role = res.data;
      localStorage.setItem("cred", role);
      setAuth(role);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Log In Form</h1>
      <input
        type="text"
        placeholder="Username"
        name="user"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Password"
        name="pwd"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Log In</button>
      {error && "Something went wrong!"}
      <div className="signup">
        <Link
          to="/register "
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Sign Up
        </Link>
        <Link
          to="/dashboard "
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Login;
