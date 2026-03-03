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

const login = async (req, res) => {
  try {
    const { emailID, password } = req.body;
    if (!emailID) throw new Error("Invalid Creds");
    if (!password) throw new Error("Invalid Creds");

    const user = await User.findOne({ emailID });
    const match = bcrypt.compare(password, user.password);

    if (!match) throw new Error("Invalid Creds");

    const token = jwt.sign(
      { _id: user._id, emailID: emailID },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 },
    );

    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(200).send("Logged In Successfully");
  } catch (error) {
    res.send("Error: " + error);
  }
};
