import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import axios from "axios";
import { WorkoutDetails } from "../components/WorkoutDetails";
import { WorkoutForm } from "../components/WorkoutForm";

function Home() {
  const { user } = useAuthContext();
  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(
          "https://gym-blog-3.onrender.com/api/workouts/",
          {
            headers: { Authorization: `Bearer ${user.token}` }, // Ensure token exists and is valid
          }
        );
        dispatch({ type: "SET_WORKOUTS", payload: response.data });
      } catch (err) {
        console.error(err); // Logs error in case API call fails
      }
    };

    if (user) {
      fetchWorkouts(); // Fetch workouts only if user is logged in
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workout">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails
              key={workout._id} // Key ensures each component is uniquely identified
              workout={workout}
            ></WorkoutDetails>
          ))}
      </div>
      <WorkoutForm /> {/* Form to add new workout */}
    </div>
  );
}

export default Home;
