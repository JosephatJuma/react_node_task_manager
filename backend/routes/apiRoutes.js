const express = require("express");
const router = express.Router();
const register = require("./api/auth");

router.use("/auth", register);
module.exports = router;
