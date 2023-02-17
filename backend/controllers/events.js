const { Event } = require("../models/events");
const { ErrorResponse } = require("../utils/ErrorResponse");

const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    next(error);
  }
};

const getEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate("author");
    req.json(event);
  } catch (error) {
    next(error);
  }
};

const createEvent = async (req, res, next) => {
  try {
    const {
      title,
      description,
      general_location,
      type,
      date,
      eventPic,
    } = req.body;
    const author = req.user.id;
    const event = await Event.create({
      title,
      description,
      general_location,
      type,
      date,
      eventPic,
      author,
    });
    res.json(event);
  } catch (error) {
    next(error);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      general_location,
      type,
      date,
      eventPic,
      author,
      is_active,
    } = req.body;

    const event = await Event.findByIdAndUpdate(
      id,
      {
        title,
        description,
        general_location,
        type,
        date,
        eventPic,
        author,
        is_active,
      },
      { new: true }
    );

    res.json(event);
  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    res.json(event);
  } catch (error) {
    next(error);
  }
};

// const getEvents = async (req, res, next) => {
//   try {
//     const events = await Event.find({});
//     res.json(events);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
