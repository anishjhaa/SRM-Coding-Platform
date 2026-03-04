require("dotenv").config();
// console.log("ENV CHECK:", process.env.DB_CONNECT_STRING);
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const main = require("./config/db");
const redisClient = require("./config/redis");
const authRouter = require("./routes/userAuth");
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/user", authRouter);
const IntializeConnection = async () => {
  try {
    await Promise.all([main(), redisClient.connect()]);
    console.log("DB Connected");

    app.listen(process.env.PORT, () => {
      console.log("Server listening at port number: " + process.env.PORT);
    });
  } catch (error) {
    console.log("Error: " + error);
  }
};
IntializeConnection();
