import axios from "axios";
import AuthContext from "../context/AuthProvider";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchItem from './SearchItem'

export default function Search() {
  const { setAuth } = useContext(AuthContext);
  const [field, setField] = useState({
    field: "",
  });
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setField((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/search", field);
      setData(res.data);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>SearchBar</h1>
      <input
        type="text"
        placeholder="Search for ..."
        name="field"
        onChange={handleChange}
      />
        {data.map((item) => (<SearchItem key={item.idmovie} data={item}/>))}
      <button onClick={handleClick}>Search</button>
      {error && "Something went wrong!"}
      <Link
        to="/dashboard "
        style={{ color: "inherit", textDecoration: "none" }}
      >
        Go Back!
      </Link>
    </div>
  );
}
