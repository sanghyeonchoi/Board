import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mysql from "mysql";
import fs from "fs";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pohang5086",
  database: "opentutorials",
});
db.connect();
const app = express();

function goHome(req, res) {
  db.query(`SELECT * FROM icecream`, function (error, icecreams) {
    res.send(icecreams);
  });
}
function showDetail(req, res) {
  db.query(
    `SELECT * FROM icecream WHERE id = ?`,
    [req.params.id],
    function (error, ids) {
      res.send(ids);
    }
  );
}
// function getCreate(req, res) {
//   fs.readFile("./create.html", "utf-8", function (error, results) {
//     res.send(results);
//   });
// }
function postCreate(req, res) {
  const body = req.body;
  console.log(body);
  db.query(
    "INSERT INTO icecream (name,description,created,author) VALUES (?,?,?,?)",
    [body.name, body.description, new Date(), body.author],
    function (error, result) {
      if (!error) {
        res.json({ message: "성공" });
      } else {
        res.json({ message: "실패" });
      }
    }
  );
}

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", goHome);
app.get("/detail/:id", showDetail);
// app.get("/create", getCreate);
app.post("/create", postCreate);
export default app;
