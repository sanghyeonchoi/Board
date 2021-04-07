import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import bodyParser from "body-parser";
import helmet from "helmet";

// DB 연결
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pohang5086",
  database: "opentutorials",
});
db.connect();
const app = express();

function articles(req, res) {
  db.query(`SELECT * FROM icecream`, function (error, icecreams) {
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

function postCreate(req, res) {
  const body = req.body;
  console.log(body);
  db.query(
    "INSERT INTO icecream (name,description,created,author) VALUES (?,?,?,?)",
    [body.name, body.description, new Date(), body.author],
    function (error, result) {
      console.log(error);

      if (!error) {
        res.json({ message: "성공" });
      } else {
        res.json({ message: "실패" });
      }
    }
  );
}

function update(req, res) {
  const body = req.body;
  console.log(body);
  db.query(
    `UPDATE icecream  SET name = ?, description = ?, created = ? WHERE id =?`,
    [body.name, body.description, new Date(), req.params.id],
    function (error, update) {
      if (!error) {
        res.json({ message: "성공" });
      } else {
        console.log(error);
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

//라우팅 하는 이유: 비슷한 것들 끼리 정리해 놓기 위해
//게시판 홈
app.get("/", articles);
//게시판 상세
app.get("/:id", showDetail);
//게시판 추가
app.post("/create", postCreate);
//게시판 수정
app.post("/:id", update);

//게시판 삭제
app.delete("/:id", deleteName);

export default app;
