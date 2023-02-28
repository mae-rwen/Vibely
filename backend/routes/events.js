const express = require("express");

const {
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  coutAllEvents,
  countEventsByCategory,
} = require("../controllers/events");

const { verifyToken } = require("../middlewares/verifyToken");

const eventRouter = express.Router();

eventRouter.get("/", getEvents);

eventRouter.post("/", verifyToken, createEvent);
// eventRouter.post("/", createEvent);

eventRouter.get("/find/:id", getEvent);
eventRouter.put("/find/:id", verifyToken, updateEvent);
eventRouter.delete("/find/:id", verifyToken, deleteEvent);
eventRouter.get("/countAll", coutAllEvents);
eventRouter.get("/countByCategory", countEventsByCategory);

module.exports = {
  eventRouter,
};
