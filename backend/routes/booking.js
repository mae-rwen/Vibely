const express = require("express");

const {
  getBookedEvent,
  getBookings,
  bookEvent,
  deleteBookedEvent,
} = require("../controllers/booking");

const { verifyToken } = require("../middlewares/verifyToken");

const bookingRouter = express.Router();

bookingRouter.get("/", verifyToken, getBookings);
bookingRouter.post("/:event", verifyToken, bookEvent);
bookingRouter.get("/:id", verifyToken, getBookedEvent);
bookingRouter.delete("/:id", verifyToken, deleteBookedEvent);

module.exports = {
  bookingRouter,
};