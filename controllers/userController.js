const User = require("../model/userModel");
let users = require("../data/data");
const { v4: uuidv4 } = require("uuid");

const getUsers = (req, res) => {
  res.send(users);
};

const addUser = (req, res) => {
  const user = req.body;
  console.log(user);

  users.push({ ...user, id: uuidv4() });
  res.send(`${user.first_name} Has been Added to the Database`);
};

const getUser = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  res.send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id);

  res.send(`${id} Deleted from the Database`);
};

const updateUser = (req, res) => {
  const { id } = req.params;

  const { first_name, last_name, email } = req.body;

  const user = users.find((user) => user.id === id);

  if (first_name) user.first_name = first_name;
  if (last_name) user.last_name = last_name;
  if (email) user.email = email;

  res.send(`User with the ${id} has been updated`);
};

module.exports = {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  getUser,
};
