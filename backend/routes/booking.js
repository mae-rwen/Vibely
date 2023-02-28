const express = require("express");

const {
  getBookedEvent,
  getBookings,
  bookEvent,
  deleteBookedEvent,
} = require("../controllers/booking");

const { verifyToken } = require("../middlewares/verifyToken");

const eventRouter = express.Router();

eventRouter.get("/", verifyToken, getBookings);
eventRouter.post("event_id/", verifyToken, bookEvent);
eventRouter.get("/:id", verifyToken, getBookedEvent);
eventRouter.delete("/:id", verifyToken, deleteBookedEvent);

module.exports = {
  bookingRouter,
};