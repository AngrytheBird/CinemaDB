import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [newMovie, setNewMovie] = useState({
    name: "",
    price: null,
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
        console.log(newMovie);
      await axios.post("http://localhost:8800/movies", newMovie);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Add New Movie</h1>
      <input
        type="text"
        placeholder="Movie"
        name="name"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Price"
        name="price"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/dashboard " style={{ color: "inherit", textDecoration: "none" }}>See all movies</Link>
    </div>
  );
};

export default Add;