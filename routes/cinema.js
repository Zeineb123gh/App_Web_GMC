const express = require("express");
const auth = require("../middlewares/auth");
const {
  createCinema,
  getAllCinema,
  getCinema,
  getCinemaModeling,
  updateCinema,
  deleteCinema,
  cinemaPhoto,
  getImageFromPath,
} = require("../controllers/cinema.controllers");

const upload = require("../utils/multer");

const router = new express.Router();

// Create a cinema
router.post("/cinemas", createCinema);

router.post(
  "/cinemas/photo/:id",
  upload("cinemas").single("file"),
  cinemaPhoto
);

// Get all cinemas
router.get("/cinemas", getAllCinema);

// Get cinema by id
router.get("/cinemas/:id", getCinema);

// Update cinema by id
router.put("/cinemas/:id", auth.enhance, updateCinema);
// Delete cinema by id
router.delete("/cinemas/:id", auth.enhance, deleteCinema);

// Cinema User modeling (GET ALL CINEMAS)
router.get("/cinemas/usermodeling/:username", getCinemaModeling);
router.get("/uploads/cinemas/:filename", getImageFromPath);
module.exports = router;
