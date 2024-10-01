// import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useEffect, useState } from "react";

export const WorkoutDetails = ({ workout }) => {
  // const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const [posterEmail, setPosterEmail] = useState("");

  useEffect(() => {
    const fetchPosterEmail = async () => {
      try {
        const response = await axios.get(
          `https://gym-blog-3.onrender.com/api/workouts/${workout.user_id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setPosterEmail(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (workout.user_id) {
      fetchPosterEmail();
    }
  }, [workout.user_id, user.token]);

  // const handleSubmit = async () => {
  //   if (!user) {
  //     return;
  //   }
  //   try {
  //     const res = await axios.delete(
  //       "https://gym-blog-3.onrender.com/api/workouts/" + workout._id,
  //       {
  //         headers: { Authorization: `Bearer ${user.token}` },
  //       }
  //     );
  //     dispatch({ type: "DELETE_WORKOUT", payload: res.data });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div className="workout-details">
      <h4>{workout.title}:</h4>
      <p>
        <strong>Load (kg):</strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps:</strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <p>
        <strong>Posted by:</strong> {posterEmail ? posterEmail : "Loading..."}
      </p>
      {/* <span className="material-symbols-outlined" onClick={handleSubmit}>
        delete
      </span> */}
    </div>
  );
};
