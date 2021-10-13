const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
app.use(cors());
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "PRP",
});
//npm init
//npm install mysql express
//node index.js
//reset DB: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
var selectedYear = "2018";
app.use(express.json());
app.post("/changeYear", (req, res) => {
  const year = req.body.selectedYear;
  res.send("get 2018 detailed");
  selectedYear = year;
});
app.get("/getYear", (req, res) => {
  const year = req.query.year;
  db.query(
    "SELECT * FROM detailed WHERE year=" + '"' + year + '"',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getLegend", (req, res) => {
  const year = req.query.year;
  const topic = req.query.topic;
  const keyword = req.query.keyw;
  db.query(
    "SELECT * FROM alld WHERE year=" +
      "'" +
      year +
      "' AND school LIKE '%" +
      topic +
      "' AND keyword LIKE '%" +
      keyword +
      "%'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/getTheme", (req, res) => {
  const year = req.query.year;
  const topic = req.query.topic;
  db.query(
    "SELECT keyw, num FROM keytab WHERE school='" +
      topic +
      "'" +
      " AND year='" +
      year +
      "'" +
      " ORDER BY num DESC",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/getMentor", (req, res) => {
  const year = req.query.year;
  const mentorOI = req.query.mentorOI;
  console.log(year, mentorOI);

  db.query(
    "SELECT keyword, school, title FROM alld WHERE mentor= '" + mentorOI + "'",
    (err, result) => {
      // console.log(result);
      res.send(result);
    }
  );
});

app.listen(3001, () => {
  console.log("server running");
});
//2255
122;
