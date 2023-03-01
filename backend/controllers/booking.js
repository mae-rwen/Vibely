const { Booking } = require("../models/booking");
const { ErrorResponse } = require("../utils/ErrorResponse");

// update? like more people who would join?

const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({}).populate("user");
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

const getBookedEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Booking.findById(id).populate("user").populate("event");
    res.json(book);
  } catch (error) {
    next(error);
  }
};

const bookEvent = async (req, res, next) => {
    try {
    const { event } = req.params;
    const user = req.user.id;

    const bookEvent = await Booking.create({
      event,
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
    const book = await Booking.findByIdAndDelete(id);
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
