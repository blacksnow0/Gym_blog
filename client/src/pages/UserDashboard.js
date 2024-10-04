import React, { useEffect } from "react";
import api from "../utils/axios";
import { useAuthContext } from "../hooks/useAuthContext";
// import { WorkoutDetails } from "../components/WorkoutDetails";
import { useLoadingContext } from "../context/loadingContext";
import UserGrid from "../components/UserGrid";
import { WorkoutForm } from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const UserDashboard = () => {
  const { user } = useAuthContext(); // Get the logged-in user
  const { setLoading } = useLoadingContext();
  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    const fetchUserWorkouts = async () => {
      if (!user) return; // Ensure user is logged in
      setLoading(true);
      try {
        const response = await api.get(
          "/workouts/userWorkouts" // Your new API for fetching user-specific workouts
        );
        dispatch({ type: "GET_USER_WORKOUTS", payload: response.data }); // Set the fetched workouts to the state
      } catch (err) {
        console.error("Failed to fetch user workouts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserWorkouts(); // Call the function when the component mounts
  }, [user, setLoading, dispatch]);

  return (
    <div className="user-dashboard">
      {/* <h2>Your Workouts....</h2>
      <div className="workouts">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))
        ) : (
          <p>No workouts found for your account.</p>
        )}
      </div> */}
      <div>
        <UserGrid workouts={workouts} />
      </div>
      <WorkoutForm />
    </div>
  );
};

export default UserDashboard;
