const asyncHandler = require("express-async-handler");
const User = require("../models/UserSchema");
const Ticket = require("../models/TicketSchema");

const getTickets = asyncHandler(async (req, res) => {
  // GET USER USING THE ID IN THE JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found!!");
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

const getTicket = asyncHandler(async (req, res) => {
  // Get users id from jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket Not Found!");
  }

  res.status(200).json(ticket);
});

const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please Fill All Details");
  }

  // Get users id from jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.send(ticket);
});

module.exports = { getTickets, getTicket, createTicket };
