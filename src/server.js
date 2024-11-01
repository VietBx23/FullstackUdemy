const express = require("express"); // commonjs
const path = require("path");
require("dotenv").config();
const app = express(); // commonjs  app express
const port = process.env.PORT || 8082; // port number to listen on

//import
// config teamplate engie
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// config static files
app.use(express.static(path.join(__dirname, "public")));

// route
app.get("/", (req, res) => {
  res.send("Hello World for Developer"); // send a response back to the client
});

app.get("/abc", (req, res) => {
  // res.send("Hello World! from abc");
  res.render("sample.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); // log a message to the console
});
