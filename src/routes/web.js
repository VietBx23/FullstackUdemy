const express = require("express"); //  Import the express module
const { getHomePage, abc } = require("../controllers/HomeController");

const router = express.Router(); //  Create a new router instance

// khai báo route
router.get("/", getHomePage);

router.get("/abc", abc);

module.exports = router; // export default
