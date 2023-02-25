const router = require("express").Router();
const auth = require("../auth/auth");
const RecipeModel = require("../model/recipe");

router.get("/recipe", auth, async (req, res) => {
  try {
    const data = await RecipeModel.find();
    res.json(data);
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
  }
});

router.post("/recipe", auth, async (req, res) => {
  try {
    let body = req.body;
    let dataTemp = {
      title: body.title,
      author: body.author,
      image: { url: body.image, type: "image" },
      ingredients: body.ingredients.split(","),
      directions: body.directions,
    };
    // console.log(dataTemp);
    const data = await RecipeModel.create({ ...dataTemp });
    res.status(201).json({
      status: "succuss",
      message: "created",
      // data:data
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
  }
});

module.exports = router;
