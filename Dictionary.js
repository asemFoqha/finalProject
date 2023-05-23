const cors = require("cors");
const express = require("express");
const app = express();
var mysql = require("mysql");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "entries",
});

app.get("/api/test", (req, res) => {
  connection.query(
    `select * from entries where word= '${req.query.word}'`,
    (err, rows, fields) => {
      if (err) throw err;

      res.send(rows);
    }
  );
});

//FIXME: end connection when the client is closed

app.listen(3000, () => connection.connect());
