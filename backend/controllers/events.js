const { Event } = require("../models/events");
const { ErrorResponse } = require("../utils/ErrorResponse");
const { Category } = require("../models/categories");

const getEvents = async (req, res, next) => {
  try {
    // for filters
    const query = {};
    if (req.query.location) {
      query.general_location = req.query.location
    }
    if (req.query.type) {
      query.type = req.query.type
    }
    if (req.query.category) {
      query.category = req.query.category
    }   
    
    // for sorting
    const { sortBy } = req.query;
    let sortOptions = {};
    if (sortBy === 'createdAt') {
      sortOptions.createdAt = -1; 
    } else if (sortBy === 'dateAsc') {
      sortOptions.date = 1 
    } else if (sortBy === 'dateDesc') {
      sortOptions.date = -1 
    } else if (sortBy === 'locationAsc') {
      sortOptions.general_location = 1 
    } else if (sortBy === 'locationDesc') {
      sortOptions.general_location = -1 
    } else if (sortBy === 'organizer') {
      sortOptions.author = 1 
    }
    const events = await Event.find(query)
    .populate("author").populate("category")
    .sort(sortOptions);
    res.json(events);
  } catch (error) {
    next(error);
  }
};

const getEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate("author").populate("category");
    res.json(event);
  } catch (error) {
    next(error);
  }
};

const coutAllEvents = async (req, res, next) => {
  try {   
    const count = await Event.estimatedDocumentCount()
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
    const categoryDoc = await Category.findByIdAndUpdate( category, { $inc: { eventTotal: 1 } }, { new : true });    
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
    const categoryDoc = await Category.findByIdAndUpdate( event.category, { $inc: { eventTotal: -1 } }, { new : true });
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
