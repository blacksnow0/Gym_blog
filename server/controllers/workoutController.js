const mongoose = require("mongoose");
const Workout = require("../models/workoutModel");
const User = require("../models/userModel");

// Helper function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

//getting workouts for particular user
const getUserWorkouts = async (req, res) => {
  const user_id = req.user._id;
  if (!isValidObjectId(user_id)) {
    return res.status(400).json({ error: "Invalid userId" });
  }
  try {
    const workouts = await Workout.find({ user_id })
      .sort({ createdAt: -1 })
      .populate("user_id", "email")
      .lean();
    res.status(200).json(workouts);
  } catch (err) {
    console.error("Error fetching workouts", err);
    res.status(500).json({ error: "Error fetching workouts" });
  }
};

// Get all workouts
const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({})
      .sort({ createdAt: -1 })
      .populate("user_id", "email")
      .lean();
    res.status(200).json(workouts);
  } catch (err) {
    console.error("Error fetching workouts", err);
    res
      .status(500)
      .json({ error: "Error fetching workouts, please try again later." });
  }
};

// Get a single workout by id
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid workout ID" });
  }

  try {
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    res.status(200).json(workout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching the workout" });
  }
};

// Create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  // Check for missing fields
  const emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!load) emptyFields.push("load");
  if (!reps) emptyFields.push("reps");

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill in all the fields",
      emptyFields,
    });
  }

  try {
    const user_id = req.user._id; // Assuming req.user exists from authentication middleware
    let workout = await Workout.create({ title, load, reps, user_id });
    workout = await workout.populate("user_id", "email");
    res.status(201).json(workout);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error creating workout" });
  }
};

// Delete a workout by id
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid workout ID" });
  }

  try {
    const workout = await Workout.findOneAndDelete({ _id: id });

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    res.status(200).json({ message: "Workout deleted", workout });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting workout" });
  }
};

module.exports = {
  getAllWorkouts,
  createWorkout,
  getWorkout,
  deleteWorkout,
  getUserWorkouts,
};
