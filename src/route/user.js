const router = require("express").Router();
const UserModel = require("../model/user");
// const auth = require("../auth/auth");
const bcrypt = require("bcrypt");
require("dotenv").config();
const key = process.env.KEY;
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    let body = req.body;
    // console.log(body.password);
    const data = await UserModel.findOne({ email: body.email });
    if (data) {
      const match = await bcrypt.compare(body.password, data.password);

      if (match) {
        let token = jwt.sign(
          {
            data: { userName: data.userName, id: data.id },
          },
          key,
          { expiresIn: "1h" }
        );
        res.json({
          status: "Success",
          userName: data.userName,
          token: token,
        });
      } else {
        res.status(406).json({
          status: "failed",
          message: "match failed",
        });
      }
    } else {
      res.status(406).json({
        status: "failed",
        message: "invalid",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    let body = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);
    const data = await UserModel.create({ ...body, password: hash });
    res.status(201).json({
      status: "succuss",
      message: "created",
      // data:data
    });
  } catch (e) {
    if (e.keyValue?.email) {
      res.status(406).json({
        status: "failed",
        meassage: "email already used",
      });
    } else {
      res.status(500).json({
        status: "failed",
        message: e,
      });
    }
  }
});

module.exports = router;
