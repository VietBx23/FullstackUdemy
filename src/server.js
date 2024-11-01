const express = require("express"); // commonjs
const path = require("path");
const app = express(); // commonjs  app express
const port = 8081; // port number to listen on
// config teamplate engie
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// route
app.get("/", (req, res) => {
  res.send("Hello World!"); // send a response back to the client
});

app.get("/abc", (req, res) => {
  // res.send("Hello World! from abc");
  res.render("sample.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); // log a message to the console
});
