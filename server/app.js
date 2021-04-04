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

//메인 게시판
function goHome(req, res) {
  db.query(`SELECT * FROM icecream`, function (error, icecreams) {
    res.send(icecreams);
  });
}

// 상세보기
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
//글 생성
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

function deleteName(req, res) {
  db.query(
    "DELETE FROM icecream WHERE id =?",
    [req.params.id],
    function (error, del) {
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
app.get("/:id", showDetail);
app.delete("/:id", deleteName);
app.post("/create", postCreate);
export default app;
