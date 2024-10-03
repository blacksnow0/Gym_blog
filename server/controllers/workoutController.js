const mongoose = require("mongoose");
const Workout = require("../models/workoutModel");
const User = require("../models/userModel");

// Helper function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Get all workouts
const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({})
      .sort({ createdAt: -1 })
      .populate("user_id", "email")
      .lean();
    res.status(200).json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching workouts" });
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

//Get a Username

const getUserName = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid user id" });
  }
  try {
    const user = await User.findById(id).populate("email");
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.status(200).json(user.email);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching the User" });
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
    const workout = await Workout.create({ title, load, reps, user_id });
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
  getUserName,
};
