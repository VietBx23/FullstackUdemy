const express = require("express"); //  Import the express module
const router = express.Router(); //  Create a new router instance

// khai báo route
router.get("/", (req, res) => {
  res.send("Hello World for Developer"); // send a response back to the client
});

router.get("/abc", (req, res) => {
  // res.send("Hello World! from abc");
  res.render("sample.ejs");
});

module.exports = router; // export default
