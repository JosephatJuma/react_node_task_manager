const express = require("express");
const router = express.Router();
const tasksController = require("../../controllers/tasks");

router.post("/:user_id", tasksController.addTask);
router.get("/:user_id", tasksController.all);
router.delete("/:task_id", tasksController.delete);
router.patch("/:task_id", tasksController.modify);

module.exports = router;
