const asyncHandler = require("express-async-handler");
const User = require("../models/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    res.status(400);
    throw new Error("Please Fill All Details");
  }

  // Find if user already exist

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    res.status(401);
    throw new Error("User Already Exist");
  }

  // Generate Salt
  const salt = await bcrypt.genSalt(10);

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  }
});

// Login User

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please Fill All Details");
  }

  const user = await User.findOne({ email: email });

  // Check User & Pass

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200);
    user.isAdmin
      ? res.json({
          id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
          isAdmin: user.isAdmin,
        })
      : res.json({
          id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// Protected Route Example
const getMe = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// Generate Token
const generateToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.jwtkey, {
    expiresIn: "1d",
  });
  return token;
};

module.exports = { registerUser, loginUser, getMe };
