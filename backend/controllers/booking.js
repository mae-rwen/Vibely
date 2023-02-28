const { Book } = require("../models/booking");
const { Event } = require("../models/events");
const { ErrorResponse } = require("../utils/ErrorResponse");

// update? like more people who would join?

const getBookings = async (req, res, next) => {
  try {
    const bookings = await Book.find({});
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

const getBookedEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).populate("event").populate(user);
    res.json(book);
  } catch (error) {
    next(error);
  }
};

const bookEvent = async (req, res, next) => {
  try {
    const {
      category,
    } = req.body;
    const event = await Event.findOne({ _id: req.params.event._id});
    const user = req.user.id;
    const booking = new Book({
        user
    })
    const bookEvent = await Book.create({
        event,
        category,
        event_id,
        user,
    });
    res.json(bookEvent);
  } catch (error) {
    next(error);
  }
};

const deleteBookedEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    res.json(book);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBookings,
  getBookedEvent,
  bookEvent,
  deleteBookedEvent,
};
