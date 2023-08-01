const bcrypt = require("bcrypt");
const mysql = require("mysql");

const searchFor = async (req, res) => {
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2215",
    database: "movies",
  });

  const { field } = req.body;
  if (!field)
    return res.status(400).json({ message: "Movie title is required." });

  db.query("SELECT * FROM movies WHERE name = ?;", [field], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

module.exports = { searchFor };
