import React, { useEffect, useState } from "react";
import api from "../utils/axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { WorkoutDetails } from "../components/WorkoutDetails";
import { useLoadingContext } from "../context/loadingContext";

const UserDashboard = () => {
  const { user } = useAuthContext(); // Get the logged-in user
  const [workouts, setWorkouts] = useState([]); // State for storing user-specific workouts
  const { setLoading } = useLoadingContext();

  useEffect(() => {
    const fetchUserWorkouts = async () => {
      if (!user) return; // Ensure user is logged in
      setLoading(true);
      try {
        const response = await api.get(
          "/workouts/userWorkouts" // Your new API for fetching user-specific workouts
        );
        setWorkouts(response.data); // Set the fetched workouts to the state
      } catch (err) {
        console.error("Failed to fetch user workouts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserWorkouts(); // Call the function when the component mounts
  }, [user, setLoading]);

  return (
    <div className="user-dashboard">
      <h2>Your Workouts</h2>
      <div className="workouts">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))
        ) : (
          <p>No workouts found for your account.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
