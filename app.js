import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mysql from "mysql";

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
    console.log(icecreams);
    res.send(icecreams);
  });
}
function showDetail(req, res) {
  db.query(
    `SELECT * FROM icecream WHERE id = ?`,
    [req.params.id],

    function (error, ids) {
      console.log(ids);
      res.send(ids);
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

export default app;
