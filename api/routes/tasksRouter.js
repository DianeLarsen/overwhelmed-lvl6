const express = require("express");
const tasksRouter = express.Router();
const {
  createTask,
  getTasks,
  getUserTasks,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");

// Get All Tasks
tasksRouter.get("/", getTasks);

// Get tasks by User ID
tasksRouter.get("/user", getUserTasks);

// Add new Task
tasksRouter.post("/", createTask);

// Delete Task
tasksRouter.delete("/:taskId", deleteTask);

// Update Task
tasksRouter.patch("/:taskId", updateTask);

module.exports = tasksRouter;
