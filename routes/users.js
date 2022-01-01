const express = require("express");
const upload = require("../utils/multer");
const auth = require("../middlewares/auth");
const {
  addUser,
  userPhoto,
  login,
  loginFacebook,
  loginGoogle,
  logout,
  getAllUsers,
  getUser,
  getUserId,
  editUser,
  updateUserAdmin,
  deleteUserId,
  deleteUser,
  getImageFromPath,
} = require("../controllers/user.controllers");

const router = new express.Router();

// Create a user
router.post("/users", addUser);

router.post("/users/photo/:id", upload("users").single("file"), userPhoto);

// Login User
router.post("/users/login", auth.simple, login);

router.post("/users/login/facebook", loginFacebook);

router.post("/users/login/google", loginGoogle);

// Logout user
router.post("/users/logout", auth.simple, logout);

// Get all users
router.get("/users", auth.enhance, getAllUsers);

// User infos
router.get("/users/me", getUser);

// Get user by id only for admin
router.get("/users/:id", getUserId);

// Edit/Update user
router.put("/users/me", editUser);

// Admin can update user by id
router.put("/users/:id", auth.enhance, updateUserAdmin);

// Delete by id
router.delete("/users/:id", auth.enhance, deleteUserId);

router.delete("/users/me", auth.enhance, deleteUser);
router.get("/uploads/users/:filename", getImageFromPath);
module.exports = router;
