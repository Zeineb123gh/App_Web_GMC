const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Showtime = require("../models/showtime");

// Create a showtime
exports.createShow = async (req, res) => {
  const showtime = new Showtime(req.body);
  try {
    await showtime.save();
    res.status(201).send(showtime);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Get all showtimes
exports.getAllShowtime = async (req, res) => {
  try {
    const showtimes = await Showtime.find({});
    res.send(showtimes);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Get showtime by id
exports.getShowtime = async (req, res) => {
  const _id = req.params.id;
  try {
    const showtime = await Showtime.findById(_id);
    return !showtime ? res.sendStatus(404) : res.send(showtime);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Update showtime by id
exports.updateShowtime = async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "startAt",
    "startDate",
    "endDate",
    "movieId",
    "cinemaId",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates!" });

  try {
    const showtime = await Showtime.findById(_id);
    updates.forEach((update) => (showtime[update] = req.body[update]));
    await showtime.save();
    return !showtime ? res.sendStatus(404) : res.send(showtime);
  } catch (e) {
    return res.status(400).send(e);
  }
};

// Delete showtime by id
exports.deleteShowtime = async (req, res) => {
  const _id = req.params.id;
  try {
    const showtime = await Showtime.findByIdAndDelete(_id);
    return !showtime ? res.sendStatus(404) : res.send(showtime);
  } catch (e) {
    return res.sendStatus(400);
  }
};


