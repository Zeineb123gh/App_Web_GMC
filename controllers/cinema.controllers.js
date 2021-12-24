const express = require("express");
const fs = require("fs");
const path = require("path");
const Cinema = require("../models/cinema");
const userModeling = require("../utils/userModeling");

// Create a cinema
exports.createCinema = async (req, res) => {
  const cinema = new Cinema(req.body);
  try {
    await cinema.save();
    res.status(201).send(cinema);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.cinemaPhoto = async (req, res, next) => {
  const url = ``;
  const { file } = req;
  const cinemaId = req.params.id;
  try {
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) return res.sendStatus(404);
    cinema.image = path.join(url, file.path);
    await cinema.save();
    res.send({ cinema, file });
  } catch (e) {
    console.log(e);
    res.sendStatus(400).send(e);
  }
};

// Get all cinemas
exports.getAllCinema = async (req, res) => {
  try {
    const cinemas = await Cinema.find({});
    res.send(cinemas);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Get cinema by id
exports.getCinema = async (req, res) => {
  const _id = req.params.id;
  try {
    const cinema = await Cinema.findById(_id);
    if (!cinema) return res.sendStatus(404);
    return res.send(cinema);
  } catch (e) {
    return res.status(400).send(e);
  }
};

// Update cinema by id
exports.updateCinema = async (req, res) => {
  try {
    const { id } = req.params;
    await Cinema.updateOne({ _id: id }, { $set: { ...req.body } });
    res.send({ msg: "updated succ" });
  } catch (error) {
    res.status(400).send({ msg: "can not update" });
  }
};

// Delete cinema by id
exports.deleteCinema = async (req, res) => {
  const _id = req.params.id;
  try {
    const cinema = await Cinema.findByIdAndDelete(_id);
    if (!cinema) return res.sendStatus(404);
    return res.send(cinema);
  } catch (e) {
    return res.sendStatus(400);
  }
};

// Cinema User modeling (GET ALL CINEMAS)
exports.getCinemaModeling = async (req, res) => {
  const { username } = req.params;
  try {
    const cinemas = await Cinema.find({});
    const cinemasUserModeled = await userModeling.cinemaUserModeling(
      cinemas,
      username
    );
    res.send(cinemasUserModeled);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.getImageFromPath = async (req, res) => {
  const { filename } = req.params;
  const file = fs.readFileSync(path.join("uploads", "cinemas", filename));
  res.end(file);
};
