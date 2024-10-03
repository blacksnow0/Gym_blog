const express = require("express");

const {
  createWorkout,
  getAllWorkouts,
  deleteWorkout,
  getUserWorkouts,
} = require("../controllers/workoutController");

const requireAuth = require("../middleware/requireAuth");

const workoutRouter = express.Router();

// Apply requireAuth middleware to all routes
workoutRouter.use(requireAuth);

// Get all workouts
workoutRouter.get("/", getAllWorkouts);

// Create a new workout
workoutRouter.post("/", createWorkout);

// Delete a workout by id
workoutRouter.delete("/:id", deleteWorkout);

workoutRouter.get("/userWorkouts", getUserWorkouts);

module.exports = workoutRouter;
