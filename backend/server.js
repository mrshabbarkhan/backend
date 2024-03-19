const express = require("express");
require("dotenv").config();
const cors = require('cors');
const connect = require("../backend/config/db_config");
const { router } = require("./routers/UserRoute");
// const { Trouter } = require("./routers/TicketRoute");
// const errorHandler = require("./middleware/errorHandler");
const app = express();
const port = process.env.PORT || 5000;
connect();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/data", (req, res) => {
  res.json({
    msg:"success"
  })
});
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
app.use("/user", router);
// app.use("/ticket", Trouter);
// app.use(errorHandler);
