const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  getUser,
} = require("../controllers/userController");

// Viewing the Users
router.get("/", getUsers);

// Adding New Users
router.post("/", addUser);

//Retrieving Specific Users

router.get("/:id", getUser);

// Deleting User from the Database

router.delete("/:id", deleteUser);

// Updating a Specific Value in the Users

router.patch("/:id", updateUser);

module.exports = router;
