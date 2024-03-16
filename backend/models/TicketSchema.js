const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    product: {
      type: String,
      require: [true, "please fill all details"],
      enum: ["iphone", "ipod", "iWatch", "macbook", "airpod"],
    },
    description: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
      enum: ["new", "progress", "solved", "closed"],
      default:'new'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TicketSchema", TicketSchema);
