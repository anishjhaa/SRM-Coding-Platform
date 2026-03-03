const express = require("express");
const authRouter = express.Router();
const {
  register,
  login,
  logout,
  adminRegister,
} = require("../controllers/userAuthent");
const adminMiddleware = require("../middleware/adminMiddleware");

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", userMiddleware, logout);
authRouter.post("/getProfile", adminMiddleware, getProfile);

module.exports = authRouter;
