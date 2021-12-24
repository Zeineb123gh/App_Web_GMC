const express = require("express");
const auth = require("../middlewares/auth");
const {
  createMovie,
  getMovie,
  deleteMovie,
  updateMovie,
  getAllMovie,
  getMovieModeling,
  getMoviePhoto,
  getImageFromPath,
} = require("../controllers/movie.controllers");

const upload = require("../utils/multer");

const router = new express.Router();

// Create a movie
router.post("/movies", auth.enhance, createMovie);

router.post(
  "/movies/photo/:id",
  upload("movies").single("file"),
  getMoviePhoto
);

// Get all movies
router.get("/movies", getAllMovie);

// Get movie by id
router.get("/movies/:id", getMovie);

// Update movie by id
router.put("/movies/:id", auth.enhance, updateMovie);

// Delete movie by id
router.delete("/movies/:id", auth.enhance, deleteMovie);

// Movies User modeling (Get Movies Suggestions)
router.get("/movies/usermodeling/:username", getMovieModeling);
router.get("/uploads/movies/:filename", getImageFromPath);

module.exports = router;
