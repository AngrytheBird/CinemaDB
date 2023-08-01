import AuthContext from "../context/AuthProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";

export function Movies({ movies, movie, onChange }) {
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <div className="Movies">
      <label htmlFor="movie">Pick a movie</label>
      <select
        id={movie.idmovie}
        value={movie.name}
        onChange={(e) => {
          onChange(movies.find((movie) => movie.name === e.target.value));
        }}
      >
        {movies.map((movie) => (
          <option key={movie.idmovie} value={movie.name}>
            {movie.name} (${movie.price})
          </option>
        ))}
      </select>
      {auth == 3001 && (
        <>
          <button className="addHome">
            <Link
              to="/add"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Add Movie
            </Link>
          </button>
          <button className="addHome">
            <Link
              to="/search"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Look Up a Movie
            </Link>
          </button>
        </>
      )}
    </div>
  );
}
