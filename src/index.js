require("dotenv").config();
// console.log("ENV CHECK:", process.env.DB_CONNECT_STRING);
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const main = require("./config/db");
app.use(express.json());
app.use(cookieParser());

main()
  .then(async () => {
    app.listen(process.env.PORT, () => {
      console.log("Server listening at port number: " + process.env.PORT);
    });
  })
  .catch((err) => console.log("Error Occurred: " + err));
