import axios from "axios";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export function Cinema({ movie, selectedSeats, onSelectedSeatsChange, seats }) {
  const navigate = useNavigate();

  function handleSelectedState(seat) {
    const isSelected = selectedSeats.includes(seat);
    if (isSelected) {
      onSelectedSeatsChange(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    } else {
      onSelectedSeatsChange([...selectedSeats, seat]);
    }
  }

  async function handleBuy() {
    let temp = movie.occupied.split(",");
    selectedSeats.map((selectedSeat) =>
      temp.splice(1, 0, " " + selectedSeat.toString())
    );
    movie.occupied = temp.join(",");

    try {
      const res = await axios.put(
        `http://localhost:8800/movies/${movie.idmovie}`,
        {
          occupied: `${movie.occupied}`,
        }
      );
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="Cinema">
      <div className="screen" />

      <div className="seats">
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat);
          const isOccupied = movie.occupied?.includes(seat);
          return (
            <span
              tabIndex="0"
              key={seat}
              className={clsx(
                "seat",
                isSelected && "selected",
                isOccupied && "occupied"
              )}
              onClick={isOccupied ? null : () => handleSelectedState(seat)}
            />
          );
        })}
      </div>
      <button onClick={handleBuy}>Buy</button>
    </div>
  );
}
