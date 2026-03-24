const redisClient = require("../config/redis");
const User = require("../models/user");
const validate = require("../utils/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    // first need to validate the use
    validate(req.body);
    const { emailID, password } = req.body;
    req.body.password = await bcrypt.hash(password, 10);

    // Token generate krna
    const user = await User.create(req.body);
    const token = jwt.sign(
      { _id: user._id, emailID: emailID },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 },
    );
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(201).send("User Registered Successfully");
  } catch (error) {
    res.status(400).send("Error: " + error);
  }
};

const adminRegister = async (req, res) => {
  try {
    // ist way to register the admin
    // if (req.result.role != "admin") {
    //   throw new Error("Invalid Creds");
    // }
    validate(req.body);
    const { firstName, lastName, password } = req.body;
    req.body.password = await bcrypt.hash(password, 10);

    req.body.role = "admin";

    const user = await User.create(req.body);
    // user.role = "admin";
    const token = jwt.sign(
      { _id: user._id, emailID: user.emailID, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 },
    );
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(201).send("Admin Registered Successfully");
  } catch (error) {
    res.status(400).send("Error in creating admin: + " + error);
  }
};

const login = async (req, res) => {
  try {
    const { emailID, password } = req.body;
    if (!emailID) throw new Error("Invalid Creds");
    if (!password) throw new Error("Invalid Creds");

    const user = await User.findOne({ emailID });
    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new Error("Invalid Creds");

    const token = jwt.sign(
      { _id: user._id, emailID: emailID, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 },
    );

    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(200).send("Logged In Successfully");
  } catch (error) {
    res.status(401).send("Error: " + error);
  }
};

const logout = async (req, res) => {
  try {
    // cookies ko redis m add kr dunga
    const { token } = req.cookies;
    const payload = jwt.decode(token);

    await redisClient.set(`token:${token}`, "Blocked");
    await redisClient.expireAt(`token:${token}`, payload.exp);

    // cookies clear kr dunga
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Logged out Successfully");
  } catch (error) {
    res.status(503).send("Error : + " + error);
  }
};

module.exports = { register, login, logout, adminRegister };
