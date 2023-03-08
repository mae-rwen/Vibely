const { Booking } = require("../models/booking");
const { User } = require("../models/users");
const { Event } = require("../models/events");
const { ErrorResponse } = require("../utils/ErrorResponse");

const getBookings = async (req, res, next) => {
  try {
    const query = {};
    if (req.query.user) {
      query.user = req.query.user;
    }
    if (req.query.event) {
      query.event = req.query.event;
    }
    const bookings = await Booking.find(query)
      .populate("user")
      .populate("event")
      .sort({ createdAt: -1 });
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
    const { attenders } = req.body;
    const joinedEvent = await Event.findById(event);
    const user = req.user.id;
    const attendant = await User.findById(user);
    const bookEvent = await Booking.create({
      event: joinedEvent,
      user,
    });
    const eventDoc = await Event.findByIdAndUpdate(
      event,
      { $inc: { joined: 1 }, $push: { attenders: { user } } },
      { new: true }
    );   
    res.json(bookEvent);
  } catch (error) {
    next(error);
  }
};

const deleteBookedEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { event } = req.body;
    const user = req.user.id;
    const book = await Booking.findByIdAndDelete(id);

    const eventDoc = await Event.findByIdAndUpdate(
      id,
      { $inc: { joined: -1 } },
      { new: true }
    );   
    
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
