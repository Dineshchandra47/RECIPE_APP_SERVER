const mongoose = require("mongoose");

const RecipeSchema = mongoose.Schema({
  title: String,
  author: String,
  image: Object,
  ingredients: Array,
  directions: String,
});

const RecipeModel = mongoose.model("recipe", RecipeSchema);

module.exports = RecipeModel;
