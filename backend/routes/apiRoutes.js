const express = require("express");
const router = express.Router();
const auth = require("./api/auth");
const usertasks = require("./api/tasks");

router.use("/auth", auth);
router.use("/tasks", usertasks);

module.exports = router;
