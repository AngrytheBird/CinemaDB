export function ShowCase() {
    return (
      <ul className="ShowCase">
        <li>
          <span className="seat" /> <small>N/A</small>
        </li>
        <li>
          <span className="seat selected" /> <small>Selected</small>
        </li>
        <li>
          <span className="seat occupied" /> <small>Occupied</small>
        </li>
      </ul>
    );
  }
