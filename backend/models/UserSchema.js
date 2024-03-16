const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide your name"],
    },
    email: {
      type: String,
      unique: true,
      require: [true, "Please provide your gmail"],
    },
    password: {
      type: String,
      require: [true, "Please provide your password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
