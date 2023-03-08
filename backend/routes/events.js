const express = require("express");

const {
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  coutAllEvents, 
} = require("../controllers/events");

const { verifyToken } = require("../middlewares/verifyToken");

const eventRouter = express.Router();

eventRouter.get("/", getEvents);
eventRouter.post("/", verifyToken, createEvent);

eventRouter.get("/find/:id", getEvent);
eventRouter.put("/find/:id", verifyToken, updateEvent);
eventRouter.delete("/find/:id", verifyToken, deleteEvent);
eventRouter.get("/countAll", coutAllEvents);


module.exports = {
  eventRouter,
};
