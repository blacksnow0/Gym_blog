const express = require("express");

const {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  getUserName,
} = require("../controllers/workoutController");

const requireAuth = require("../middleware/requireAuth");

const workoutRouter = express.Router();

// Apply requireAuth middleware to all routes
workoutRouter.use(requireAuth);

// Get all workouts
workoutRouter.get("/", getAllWorkouts);

// Get a single workout by id
// workoutRouter.get("/:id", getWorkout);

// Create a new workout
workoutRouter.post("/", createWorkout);

// Delete a workout by id
workoutRouter.delete("/:id", deleteWorkout);

// Get User name
workoutRouter.get("/:id", getUserName);

module.exports = workoutRouter;
