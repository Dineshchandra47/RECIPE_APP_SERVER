const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.KEY;
const auth = async (req, res, next) => {
  let token = req.headers.authorization;
  // console.log(token);
  try {
    if (token) {
      jwt.verify(token, key, (err, decoded) => {
        if (err) {
          return res.status(406).json({
            status: "failed",
            message: "Invalid crediential",
          });
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      res.status(406).json({
        status: "failed",
        message: "Invalid crediential",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
  }
};

module.exports = auth;
