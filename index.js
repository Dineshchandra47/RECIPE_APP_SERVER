const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
// require("dotenv").config()
app.use(express.json());
app.use("/login", require("./loginprec"));
app.use("/refister", require("./registerrecip"));
app.use("/posts", require("./createing"));

const PORT = process.env.PORT || 5000;
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/recipeApp";

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Successfylly Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Recipe App API is working",
  });
});
app.get("/hello", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}`);
});
