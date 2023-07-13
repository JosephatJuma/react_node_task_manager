require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./database");

const port = process.env.PORT || 1000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //support parsing of application /x-www-form-urlencoded post data
app.use(cors());

//db
mongoose.connect(database.connect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
//checking if db has connected
db.once("open", () => {
  console.log("connected to db");
});
db.on("error", (err) => {
  console.log(err);
});

//import routes
const apiRoutes = require("./routes/apiRoutes");

//Requests
app.get("/", (req, res) => {
  res.send("App is running");
});

app.use("/v1/api", apiRoutes);

app.listen(port, () => {
  console.log(`app running on prot ${port}`);
});
