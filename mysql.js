const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pohang5086",
  database: "opentutorials",
});

connection.connect();
connection.query("SELECT * FROM icecream", function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});

connection.end();
