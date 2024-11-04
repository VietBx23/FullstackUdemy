require("dotenv").config();
const express = require("express"); // commonjs
const path = require("path");
const configViewEngine = require("./config/viewEngine");
const webRouter = require("./routes/web");
const app = express(); // commonjs  app express
const port = process.env.PORT || 8082; // port number to listen on

configViewEngine(app);

app.use("/v1", webRouter);
// // khai báo route
// app.get("/", (req, res) => {
//   res.send("Hello World for Developer"); // send a response back to the client
// });

// app.get("/abc", (req, res) => {
//   // res.send("Hello World! from abc");
//   res.render("sample.ejs");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); // log a message to the console
});
