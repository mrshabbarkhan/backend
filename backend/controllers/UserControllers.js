const User = require("../models/UserSchema");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.jwtkey, { expiresIn: "30d" });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.json({
      msg: "please fill all details",
    });
  }
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400);
    // throw new Error("user already exist");
    res.json({ msg: "user already exist" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.send(400).json({
      msg: "user not create",
    });
  }

  //   res.json({
  //     name,
  //     email,
  //     password,
  //   });
});

const loginuser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({
      msg: "please fill all details",
    });
  }

  const user = await User.findOne({ email: email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      msg: "envalid credentials",
    });
  }
});

module.exports = { registerUser, loginuser };
