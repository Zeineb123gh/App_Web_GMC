const express = require("express");
const auth = require("../middlewares/auth");
const {
  createShow,
  getAllShowtime,
  getShowtime,
  updateShowtime,
  deleteShowtime,
} = require("../controllers/showtime.cintrollers");

const router = new express.Router();

// Create a showtime
router.post("/showtimes", auth.enhance, createShow);

// Get all showtimes
router.get("/showtimes", getAllShowtime);

// Get showtime by id
router.get("/showtimes/:id", getShowtime);

// Update showtime by id
router.put("/showtimes/:id", auth.enhance, updateShowtime);

// Delete showtime by id
router.delete("/showtimes/:id", auth.enhance, deleteShowtime);

module.exports = router;
