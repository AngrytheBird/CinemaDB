const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2215",
  database: "movies",
});

app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/search", require("./routes/search"));

app.get("/movies", (req, res) => {
  const q = "SELECT * FROM movies ORDER BY price ASC";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.put("/movies/:id", (req, res) => {
  const idmovie = req.params.id;
  const q = "UPDATE movies SET `occupied`= ? WHERE idmovie = ?";

  db.query(q, [req.body.occupied, idmovie], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/movies", (req, res) => {
  const q = "INSERT INTO movies(`name`, `price`) VALUES (?)";

  const values = [req.body.name, req.body.price];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Server started!");
});
