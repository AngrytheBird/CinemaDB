import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [newUser, setNewUser] = useState({
    user: "",
    pwd: null,
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
        console.log(newUser);
      await axios.post("http://localhost:8800/register", newUser);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Sign Up Form</h1>
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
      <button onClick={handleClick}>Sign Up</button>
      {error && "Something went wrong!"}
      <Link to="/login " style={{ color: "inherit", textDecoration: "none" }}>Go Back!</Link>
    </div>
  );
};

export default Register;