const express = require("express");
const path = require("path");
const Movie = require("../models/movie");
const userModeling = require("../utils/userModeling");
const fs = require("fs");

// Create a movie
exports.createMovie = async (req, res) => {
  const movie = new Movie(req.body);
  try {
    await movie.save();
    return res.status(201).send(movie);
  } catch (e) {
    return res.status(400).send(e);
  }
};
//get  photomovie by id
exports.getMoviePhoto = async (req, res, next) => {
  const url = ``;
  const { file } = req;
  const movieId = req.params.id;
  try {
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    const movie = await Movie.findById(movieId);
    if (!movie) return res.sendStatus(404);
    movie.image = path.join(url, file.path);
    await movie.save();
    return res.send({ movie, file });
  } catch (e) {
    return res.sendStatus(400).send(e);
  }
};

// Get all movies
exports.getAllMovie = async (req, res) => {
  try {
    const movies = await Movie.find({});
    return res.send(movies);
  } catch (e) {
    return res.status(400).send(e);
  }
};

// Get movie by id
exports.getMovie = async (req, res) => {
  const _id = req.params.id;

  try {
    const movie = await Movie.findById(_id);
    if (!movie) return res.sendStatus(404);
    return res.send(movie);
  } catch (e) {
    return res.status(400).send(e);
  }
};

// Update movie by id
exports.updateMovie = async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "title",
    "image",
    "language",
    "genre",
    "director",
    "cast",
    "description",
    "duration",
    "releaseDate",
    "endDate",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates!" });

  try {
    const movie = await Movie.findById(_id);
    updates.forEach((update) => (movie[update] = req.body[update]));
    await movie.save();
    return !movie ? res.sendStatus(404) : res.send(movie);
  } catch (e) {
    return res.status(400).send(e);
  }
};

// Delete movie by id
exports.deleteMovie = async (req, res) => {
  const _id = req.params.id;
  try {
    const movie = await Movie.findByIdAndDelete(_id);
    return !movie ? res.sendStatus(404) : res.send(movie);
  } catch (e) {
    return res.sendStatus(400);
  }
};

// Movies User modeling (Get Movies Suggestions)
exports.getMovieModeling = async (req, res) => {
  const { username } = req.params;
  try {
    const cinemasUserModeled = await userModeling.moviesUserModeling(username);
    return res.send(cinemasUserModeled);
  } catch (e) {
    return res.status(400).send(e);
  }
};
exports.getImageFromPath = async (req, res) => {
  const { filename } = req.params;
  const file = fs.readFileSync(path.join("uploads", "movies", filename));
  res.end(file);
};
