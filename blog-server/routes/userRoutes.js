const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { saveUser, getUser, updateUser } = require("../controllers/userController");

module.exports = (db) => {
  const router = express.Router();
  const usersCollection = db.collection("users");

  // POST /api/users - Save new user
  router.post("/users", verifyToken, saveUser(usersCollection));

  // GET /api/users?email=<email> or ?uid=<uid> - Get user by email or uid
  router.get("/users", verifyToken, getUser(usersCollection));
  // Update user profile
router.put("/users/:id",verifyToken, updateUser(usersCollection));

  return router;
};
