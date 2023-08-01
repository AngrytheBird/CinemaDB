const bcrypt = require("bcrypt");
const mysql = require("mysql");

const handleLogin = async (req, res) => {
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
    "SELECT * FROM users WHERE username = ?",
    [user],
    (err, foundUser) => {
      if (err) throw err;
      if (!foundUser) return res.sendStatus(401); //Unauthorized
      validateUser(foundUser);
    }
  );
  async function validateUser(foundUser) {
    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser[0]?.password);
    if (match) {
      const role = foundUser[0].role;
      // Send authorization roles and access token to user
      res.json(role);
    } else {
      res.sendStatus(401);
    }
  }
};

module.exports = { handleLogin };
