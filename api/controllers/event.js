import Event from "../models/events.js";
import User from "../models/user.js";

// create an event

const createEvent =  async (req, res) => {
    req.body.user = req.auth._id;
  const newEvent = new Event(req.body);
  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
};
// update an event

const updateEvent =  async (req, res, next) => {
  
  Event.findOneAndUpdate(
    { _id: req.params.eventId, user: req.auth._id },
    req.body,
    { new: true },
    (err, updatedEvent) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedEvent);
    }
  );
};
// delete an event

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event.user === req.body.userId) {
      await event.deleteOne();
      res.status(200).json("the event has been deleted");
    } else {
      res.status(403).json("you can delete only your event");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// get an event

const getEvent =  async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
};



// get all user's events

const getUserEvents = (req, res, next) => {
  Event.find({ user: req.auth._id }, (err, events) => {
    if (err) {
      res.status(500);
      return next(err);
    }
   
    return res.status(200).send(events);
  });
};

export { getUserEvents, getEvent, deleteEvent, updateEvent, createEvent};