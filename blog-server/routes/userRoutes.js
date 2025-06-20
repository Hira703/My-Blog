const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { saveUser, getUser } = require("../controllers/userController");

module.exports = (db) => {
  const router = express.Router();
  const usersCollection = db.collection("users");

  // POST /api/users - Save new user
  router.post("/users", verifyToken, saveUser(usersCollection));

  // GET /api/users?email=<email> or ?uid=<uid> - Get user by email or uid
  router.get("/users", verifyToken, getUser(usersCollection));

  return router;
};
