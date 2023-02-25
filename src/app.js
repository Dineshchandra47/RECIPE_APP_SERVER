const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./route/user");
const recipeRouter = require("./route/recipe");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", userRouter);
app.use("/", recipeRouter);

app.use("*", (req, res) => {
  res.sendStatus(404);
});
module.exports = app;
