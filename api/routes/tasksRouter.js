import express from "express"

const tasksRouter = express.Router();
import {
  createTask,
  getTasks,
  getUserTasks,
  deleteTask,
  updateTask,
}  from "../controllers/taskController.js";

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

export default tasksRouter;
