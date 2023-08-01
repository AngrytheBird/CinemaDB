import "./styles.css";
import { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Cinema } from "./Cinema";
import { ShowCase } from "./ShowCase";
import { Movies } from "./Movies";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const seats = Array.from({ length: 8 * 8 }, (_, i) => i);

export default function Dashboard() {
  const { auth, setAuth } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      let cred = localStorage.getItem("cred");
      setAuth(cred);
    }
  }, []);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const res = await axios.get("http://localhost:8800/movies");
        setMovies(res.data);
        setSelectedMovie(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllMovies();
  }, []);

  return (
    <div className="App">
      <Movies
        movies={movies}
        movie={selectedMovie}
        onChange={(movie) => {
          setSelectedSeats([]);
          setSelectedMovie(movie);
        }}
      />
      <ShowCase />
      <Cinema
        movie={selectedMovie}
        selectedSeats={selectedSeats}
        onSelectedSeatsChange={(selectedSeats) =>
          setSelectedSeats(selectedSeats)
        }
        seats={seats}
      />
      <p className="info">
        You have selected <span className="count">{selectedSeats.length}</span>{" "}
        seats for the price of{" "}
        <span className="total">
          {selectedSeats.length * selectedMovie.price}$
        </span>
      </p>
      {/* <Link to="/login " style={{ color: "inherit", textDecoration: "none" }}>
        Login!
      </Link> */}
      <button
        onClick={() => {
          setAuth({});
          localStorage.clear();
          navigate("/login");
        }}
      >
        Log Out
      </button>
    </div>
  );
}

