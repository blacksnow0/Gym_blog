require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const userRouter = require("./routes/userRoute");
const workoutRouter = require("./routes/workoutRoute");

const PORT = process.env.PORT || 4400;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Mongoose connected with server at ${PORT}`);
    })
  )
  .catch((err) => {
    console.error(err);
  });

app.use("/api/users", userRouter);

app.use("/api/workouts", workoutRouter);

app.get("/", (req, res) => {
  res.json({ msg: "howdy, says the backend" });
});
