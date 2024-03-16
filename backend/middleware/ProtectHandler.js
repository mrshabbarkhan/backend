const AsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const protect = AsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.jwtkey);
      const user = await User.findById(decode.id).select('-password')

      if (!user) {
        res.status(401);
        throw new Error("not authorized");
      }
      req.user = user;
      next();
    //   console.log(decode.id);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.status(401);
    throw new Error("you are unothrized User");
  }
});

module.exports = { protect };
