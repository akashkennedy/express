const express = require("express");
const router = express.Router();
let users = require("../data/data");
const { v4: uuidv4 } = require("uuid");

// Viewing the Users
router.get("/", (req, res) => {
  res.send(users);
});

// Adding New Users
router.post("/", (req, res) => {
  const user = req.body;
  console.log(user);

  users.push({ ...user, id: uuidv4() });
  res.send(`${user.first_name} Has been Added to the Database`);
});

//Retrieving Specific Users

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);
  res.send(foundUser);
});

// Deleting User from the Database

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id);

  res.send(`${id} Deleted from the Database`);
});

// Updating a Specific Value in the Users

router.patch("/:id", (req, res) => {
  const { id } = req.params;

  const { first_name, last_name, email } = req.body;

  const user = users.find((user) => user.id === id);

  if (first_name) user.first_name = first_name;
  if (last_name) user.last_name = last_name;
  if (email) user.email = email;

  res.send(`User with the ${id} has been updated`);
});

module.exports = router;
