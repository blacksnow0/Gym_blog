import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

export const WorkoutForm = () => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyField, setEmptyField] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4400/api/workouts/",
        {
          title,
          load,
          reps,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      dispatch({ type: "CREATE_WORKOUT", payload: res.data });
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyField([]);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error);
        setEmptyField(err.response.data.emptyFields);
      } else {
        setError("Something went wrong, please try again");
      }
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label>Exercise Title:</label>
      <input
        placeholder="title"
        value={title}
        type="String"
        className={emptyField.includes("title") ? "error" : ""}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>
      <label>Load:</label>
      <input
        placeholder="load"
        value={load}
        type="Number"
        className={emptyField.includes("load") ? "error" : ""}
        onChange={(e) => {
          setLoad(e.target.value);
        }}
      ></input>
      <label>Reps:</label>
      <input
        placeholder="reps"
        value={reps}
        type="Number"
        className={emptyField.includes("reps") ? "error" : ""}
        onChange={(e) => {
          setReps(e.target.value);
        }}
      ></input>
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
