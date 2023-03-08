const { Event } = require("../models/events");
const { User } = require("../models/users")
const { ErrorResponse } = require("../utils/ErrorResponse");
const { Category } = require("../models/categories");

//checking for pagination
function isObjEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const getEvents = async (req, res, next) => {
  const { page } = req.query || 1;
  const eventsPerPage = 8;

  try {
    // for filters
    const query = {};
    const skip = (page - 1) * eventsPerPage;

    if (req.query.location) {
      console.log(req.query.location);
      query.general_location = req.query.location;
    }
    if (req.query.type) {
      query.type = req.query.type;
    }
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.user) {
      query.author = req.query.user;
    }

    // for sorting
    const { sortBy } = req.query;
    let sortOptions = {};
    if (sortBy === "createdAt") {
      sortOptions.createdAt = -1;
    } else if (sortBy === "dateAsc") {
      sortOptions.date = 1;
    } else if (sortBy === "dateDesc") {
      sortOptions.date = -1;
    } else if (sortBy === "locationAsc") {
      sortOptions.general_location = 1;
    } else if (sortBy === "locationDesc") {
      sortOptions.general_location = -1;
    } else if (sortBy === "organizer") {
      sortOptions.author = 1;
    }

    if (isObjEmpty(query)) {
      const count = await Event.estimatedDocumentCount(query); //commenting for a while
      const pageCount = Math.ceil(count / eventsPerPage);
      const events = await Event.find(query)
        .limit(eventsPerPage)
        .skip(skip)
        .populate("author")
        .populate("category")
        .sort(sortOptions);
      const allEvents = await Event.find(query);
      res.json({
        pagination: {
          count,
          pageCount,
        },
        events,
        allEvents,
      });
    } else {
      const events = await Event.find(query)
        .limit(eventsPerPage)
        .skip(skip)
        .populate("author")
        .populate("category")
        .sort(sortOptions);
      const count = events.length;
      const pageCount = Math.ceil(count / eventsPerPage);
      res.json({
        pagination: {
          count,
          pageCount,
        },
        events,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const user = req.user.id;
    const event = await Event.findById(id)
      .populate("category")
      .populate("author")
      // .populate({
      //   path: "attenders",
      // populate: {user}});
    res.json(event);
  } catch (error) {
    next(error);
  }
};

const coutAllEvents = async (req, res, next) => {
  try {
    const count = await Event.estimatedDocumentCount();
    res.json(count);
  } catch (error) {
    next(error);
  }
};

const createEvent = async (req, res, next) => {
  try {
    const {
      title,
      general_location,
      type,
      date,
      category,
      participants,
      description,
    } = req.body;
    const author = req.user.id;
    // const categoryDoc = await Category.findById(category)
    console.log(author);
    const event = await Event.create({
      title,
      general_location,
      type,
      date,
      category,
      participants,
      description,
      author,
    });
    // categoryDoc.events = [...categoryDoc.events, event._id]
    // await categoryDoc.save();
    const categoryDoc = await Category.findByIdAndUpdate(
      category,
      { $inc: { eventTotal: 1 } },
      { new: true }
    );
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
      participants,
      is_active,
    } = req.body;
    const eventDoc = await Event.findById(id);
    const isAuthor =
      JSON.stringify(eventDoc.author) === JSON.stringify(req.user.id);
    if (!isAuthor) {
      return res.status(401).json("you're nor the author");
    }
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
        participants,
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
    const { author } = req.body;
    const eventDoc = await Event.findById(id);
    const isAuthor =
      JSON.stringify(eventDoc.author) === JSON.stringify(req.user.id);
    if (!isAuthor) {
      return res.status(401).json("you're not the author");
    }
    const event = await Event.findByIdAndDelete(id);
    const categoryDoc = await Category.findByIdAndUpdate(
      event.category,
      { $inc: { eventTotal: -1 } },
      { new: true }
    );
    res.json(event);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  coutAllEvents,
};
