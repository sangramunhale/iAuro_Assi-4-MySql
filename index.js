const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const { application } = require("express");

// parse app // json

app.use(bodyParser.json());

//Create Database connection

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected");
});

// create new record

app.post("/api/create", (req, res) => {
  let data = { name: req.body.name, location: req.body.location };
  let sql = "INSERT INTO users SET ?";
  let query = conn.query(sql, data, (err, result) => {
    if (err) throw err;
    res.send(
      JSON.stringify({
        status: 200,
        err: null,
        response: "New Record Added successfully",
      })
    );
  });
});

// GET

app.get("/api/view", (req, res) => {
  let sql = "SELECT * FROM users";
  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, err: null, response: result }));
  });
});

// Single Record

app.get("/api/view/:id", (req, res) => {
  let sql = "SELECT * FROM users WHERE id=" + req.params.id;
  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, err: null, response: result }));
  });
});

// Update record

app.put("/api/update", (req, res) => {
  let sql =
    "UPDATE users SET name='" +
    req.body.name +
    "', location='" +
    req.body.location +
    "' WHERE id=" +
    req.body.id;

  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(
      JSON.stringify({
        status: 200,
        err: null,
        response: "Record Updated.....",
      })
    );
  });
});

// Delete Record

app.delete("/api/delete/:id", (req, res) => {
  let sql = "DELETE FROM users WHERE id=" + req.params.id + "";
  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(
      JSON.stringify({
        status: 200,
        err: null,
        response: "Record Deleted Successfully..",
      })
    );
  });
});

app.listen(8000, () => {
  console.log("server started on port 8000");
});
