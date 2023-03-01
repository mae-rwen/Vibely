const express = require("express");
// const { bookEvent } = require("../controllers/booking");

const {
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

const { verifyToken } = require("../middlewares/verifyToken");

const eventRouter = express.Router();

eventRouter.get("/", getEvents);

eventRouter.post("/", verifyToken, createEvent);
eventRouter.get("/:id", getEvent);
// eventRouter.post("/:id", verifyToken, bookEvent)
eventRouter.put("/:id", verifyToken, updateEvent);
eventRouter.delete("/:id", verifyToken, deleteEvent);

module.exports = {
  eventRouter,
};
