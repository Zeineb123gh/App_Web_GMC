const express = require("express");
const auth = require("../middlewares/auth");
const {
  createReservation,
  getAllReservation,
  getReservation,
  getOneReservation,
  updateReservation,
  deleteReservation,
  getUserModeling,
} = require("../controllers/reservation.controllers");

const router = new express.Router();

// Create a reservation
router.post("/reservations", auth.simple, createReservation);

// Get all reservations
router.get("/reservations", auth.simple, getAllReservation);

// Get reservation by id
router.get("/reservations/:id", getReservation);

// Get reservation checkin by id
router.get("/reservations/checkin/:id", getOneReservation);

// Update reservation by id
router.put("/reservations/:id",auth.enhance, updateReservation);

// Delete reservation by id
router.delete("/reservations/:id",auth.enhance, deleteReservation);

// User modeling get suggested seats
router.get("/reservations/usermodeling/:username", getUserModeling);

module.exports = router;
