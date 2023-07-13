const Task = require("../models/task");

//Create a new task
exports.addTask = async (req, res) => {
  const newTask = new Task(req.body);
  try {
    await newTask.save().then((task) => {
      res.send({ message: "Task added", success: true, task: task });
    });
  } catch (error) {
    res.send({ message: "An error occured", success: false });
  }
};

//get user's tasks
exports.all = async (req, res) => {
  await Task.find({ user_id: req.params.user_id })
    .then((userTasks) => {
      res.send({ tasks: userTasks });
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};

//delete a tasks

exports.delete = async (req, res) => {
  await Task.deleteOne({ _id: req.params.task_id })
    .then((deleted) => {
      res.send({ success: deleted });
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};

//edit specified details of the task

exports.modify = async (req, res) => {
  res.send("Working on it");
};
