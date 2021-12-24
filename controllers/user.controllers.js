const fs = require("fs");
const path = require("path");
const User = require("../models/user");

// Create a user
exports.addUser = async (req, res) => {
  try {
    const { role } = req.body;
    if (role) throw new Error("you cannot set role property.");
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({
      error: { message: "You have entered an invalid username or password" },
    });
  }
};

exports.loginFacebook = async (req, res) => {
  const { email, userID, name } = req.body;
  const nameArray = name.split(" ");

  const user = await User.findOne({ facebook: userID });
  if (!user) {
    const newUser = new User({
      name,
      username: nameArray.join("") + userID,
      email,
      facebook: userID,
    });
    try {
      await newUser.save();
      const token = await newUser.generateAuthToken();
      res.status(201).send({ user: newUser, token });
    } catch (e) {
      res.status(400).send(e);
    }
  } else {
    const token = await user.generateAuthToken();
    res.send({ user, token });
  }
};

exports.loginGoogle = async (req, res) => {
  const { email, googleId, name } = req.body;
  const nameArray = name.split(" ");

  const user = await User.findOne({ google: googleId });
  if (!user) {
    const newUser = new User({
      name,
      username: nameArray.join("") + googleId,
      email,
      google: googleId,
    });
    try {
      await newUser.save();
      const token = await newUser.generateAuthToken();
      res.status(201).send({ user: newUser, token });
    } catch (e) {
      res.status(400).send(e);
    }
  } else {
    const token = await user.generateAuthToken();
    res.send({ user, token });
  }
};

// Logout user
exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send({});
  } catch (e) {
    res.status(400).send(e);
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  // if (req.user.role !== "superadmin")
  //   return res.status(400).send({
  //     error: "Only the god can see all the users!",
  //   });
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
};

// User infos
exports.getUser = async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Get user by id only for admin
exports.getUserId = async (req, res) => {
  // if (req.user.role !== "superadmin")
  //   return res.status(400).send({
  //     error: "Only the god can see the user!",
  //   });
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) return res.sendStatus(404);
    res.send(user);
  } catch (e) {
    res.sendStatus(400);
  }
};

// Edit/Update user
exports.editUser = async (req, res) => {
  console.log(req.body);
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "phone", "username", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates!" });

  try {
    const { user } = req;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Admin can update user by id
exports.updateUserAdmin = async (req, res) => {
  // if (req.user.role !== "superadmin")
  //   return res.status(400).send({
  //     error: "Only the god can update the user!",
  //   });
  const _id = req.params.id;

  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "phone",
    "username",
    "email",
    "password",
    "role",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates!" });

  try {
    const user = await User.findById(_id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    if (!user) return res.sendStatus(404);
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Delete by id
exports.deleteUserId = async (req, res) => {
  // if (req.user.role !== "superadmin")
  //   return res.status(400).send({
  //     error: "Only the god can delete the user!",
  //   });
  const _id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) return res.sendStatus(404);

    res.send({ message: "User Deleted" });
  } catch (e) {
    res.sendStatus(400);
  }
};

exports.deleteUser = async (req, res) => {
  if (req.user.role !== "superadmin")
    return res.status(400).send({
      error: "You cannot delete yourself!",
    });
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.sendStatus(400);
  }
};

exports.userPhoto = async (req, res, next) => {
  const url = ``;
  const { file } = req;
  const userId = req.params.id;
  try {
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    const user = await User.findById(userId);
    if (!user) return res.sendStatus(404);
    user.imageurl = path.join(url, file.path);
    await user.save();
    res.send({ user, file });
  } catch (e) {
    console.log(e);
    res.sendStatus(400).send(e);
  }
};

exports.getImageFromPath = async (req, res) => {
  const { filename } = req.params;
  const file = fs.readFileSync(path.join("uploads", "users", filename));
  res.end(file);
};
