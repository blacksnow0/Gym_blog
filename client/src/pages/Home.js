// import React, { useEffect } from "react";
// import { useAuthContext } from "../hooks/useAuthContext";
// import { useWorkoutContext } from "../hooks/useWorkoutContext";
// import { useLoadingContext } from "../context/loadingContext";

// import axios from "axios";
// import { WorkoutDetails } from "../components/WorkoutDetails";
// import { WorkoutForm } from "../components/WorkoutForm";

// function Home() {
//   const { user } = useAuthContext();
//   const { workouts, dispatch } = useWorkoutContext();
//   console.log(workouts);
//   // const [loading, setLoading] = useState(true);
//   // const [loadingText, setLoadingText] = useState("Loading");
//   const { setLoading } = useLoadingContext();

//   // useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     setLoadingText((prev) => {
//   //       if (prev === "Loading...") {
//   //         return "Loading";
//   //       }
//   //       return prev + ".";
//   //     });
//   //   }, 500); // Change dots every 0.5 seconds

//   //   return () => clearInterval(interval); // Clean up interval on unmount
//   // }, []);

//   useEffect(() => {
//     const fetchWorkouts = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           "https://gym-blog-3.onrender.com/api/workouts/",
//           {
//             headers: { Authorization: `Bearer ${user.token}` }, // Ensure token exists and is valid
//           }
//         );
//         dispatch({ type: "SET_WORKOUTS", payload: response.data });
//       } catch (err) {
//         console.error(err); // Logs error in case API call fails
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) {
//       fetchWorkouts(); // Fetch workouts only if user is logged in
//     }
//   }, [dispatch, user, setLoading]);

//   return (
//     <div className="home">
//       <div className="workout">
//         {workouts &&
//           workouts.map((workout) => (
//             <WorkoutDetails
//               key={workout._id} // Key ensures each component is uniquely identified
//               workout={workout}
//             ></WorkoutDetails>
//           ))}
//       </div>
//       <WorkoutForm /> {/* Form to add new workout */}
//     </div>
//   );
// }

// export default Home;

import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useLoadingContext } from "../context/loadingContext";

import api from "../utils/axios";
import { WorkoutDetails } from "../components/WorkoutDetails";
import { WorkoutForm } from "../components/WorkoutForm";

function Home() {
  const { user } = useAuthContext();
  const { workouts, dispatch } = useWorkoutContext();
  const { setLoading } = useLoadingContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      try {
        const response = await api.get("/workouts/");
        dispatch({ type: "GET_ALL_WORKOUTS", payload: response.data });
      } catch (err) {
        console.error("Failed to fetch workouts:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user, setLoading]);

  return (
    <div className="home">
      <div className="workout">
        {workouts && workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))
        ) : (
          <p>No workouts found. Start adding your workouts!</p>
        )}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
