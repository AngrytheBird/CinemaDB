const bcrypt = require("bcrypt");
const mysql = require("mysql");

const handleNewUser = async (req, res) => {
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2215",
    database: "movies",
  });

  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  db.query(
    "SELECT username FROM users WHERE username = ?",
    [user],
    (err, data) => {
      if (err) throw err;
      if (data.length) return res.sendStatus(409); //Conflict
    }
  );

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user
    const result = [user, hashedPwd];

    db.query(
      "INSERT INTO users(`username`, `password`) VALUES (?)",
      [result],
      (err, data) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
