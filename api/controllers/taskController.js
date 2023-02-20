import Task from "../models/tasks.js";

// get all tasks
const getTasks = (req, res, next) => {
  Task.find((err, tasks) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(tasks);
  });
};
// get user tasks
const getUserTasks = (req, res, next) => {
  Task.find({ user: req.auth._id }, (err, tasks) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(tasks);
  });
};
// get a single task

// create new task
const createTask = (req, res, next) => {
  req.body.user = req.auth._id;
  const newTask = new Task(req.body);
  newTask.save((err, savedTask) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedTask);
  });
};

// delete a task

const deleteTask = (req, res, next) => {
  Task.findOneAndDelete(
    { _id: req.params.taskId, user: req.auth._id },
    (err, deletedTask) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res
        .status(200)
        .send(`Successfully delete task: ${deletedTask.title}`);
    }
  );
};

// update a task
const updateTask = (req, res, next) => {
  Task.findOneAndUpdate(
    { _id: req.params.taskId, user: req.auth._id },
    req.body,
    { new: true },
    (err, updatedTask) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedTask);
    }
  );
};

export {
  createTask,
  getTasks,
  getUserTasks,
  deleteTask,
  updateTask,
};
