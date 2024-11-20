const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./routes/users.js");
const path = require("path");

// Middleware
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

app.use("/users", userRouter);
