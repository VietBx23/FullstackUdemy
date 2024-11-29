const express = require("express"); //  Import the express module
const {
  getHomePage,
  abc,
  getAllUsers,
  postCreateUser,
  updateUser,
  deleteUser,
  findUserById,
  create,
  getUpdate,
} = require("../controllers/HomeController");

const router = express.Router(); //  Create a new router instance

// khai báo route
router.get("/", getHomePage);
router.get("/create", create);
router.get("/abc", abc);
router.get("/getAllUsers", getAllUsers);
router.post("/create-user", postCreateUser);
router.post("/update-user", updateUser);
router.post("/delete-users/:id", deleteUser);
router.get("/findOneUsers/:id", findUserById);

router.get("/update/:id", getUpdate);

module.exports = router; // export default
