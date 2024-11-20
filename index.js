const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const path = require("path");

let users = [
  {
    first_name: "Jhon",
    last_name: "Doe",
    email: "johndoe@example.com",
  },
  {
    first_name: "Alice",
    last_name: "Smith",
    email: "alicesmith@example.com",
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  mongoose.connect(process.env.MONGO_URI).then(
    console.log("Connected to Database Successfully"),
    app.listen(process.env.PORT, () => {
      console.log("Server Running on", process.env.PORT);
    }),
  );
} catch (err) {
  console.log(err);
}

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./index.html"));
});

// Viewing the Users
app.get("/users", (req, res) => {
  res.send(users);
});

// Adding New Users
app.post("/users", (req, res) => {
  const user = req.body;
  console.log(user);

  users.push({ ...user, id: uuidv4() });
  res.send(`${user.first_name} Has been Added to the Database`);
});

//Retrieving Specific Users

app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);
  res.send(foundUser);
});

// Deleting User from the Database

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id);

  res.send(`${id} Deleted from the Database`);
});

// Updating a Specific Value in the Users

app.patch("/users/:id", (req, res) => {
  const { id } = req.params;

  const { first_name, last_name, email } = req.body;

  const user = users.find((user) => user.id === id);

  if (first_name) user.first_name = first_name;
  if (last_name) user.last_name = last_name;
  if (email) user.email = email;

  res.send(`User with the ${id} has been updated`);
});
