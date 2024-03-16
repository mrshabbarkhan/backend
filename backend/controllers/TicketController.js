const expressAsyncHandler = require("express-async-handler");

const CreateTickets = expressAsyncHandler(async (req, res) => {
  res.send("ticket Created");
});

const GetTickets = expressAsyncHandler(async (req, res) => {
  res.send("ticket get");
});

module.exports = { CreateTickets, GetTickets };
