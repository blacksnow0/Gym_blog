import { createContext, useReducer } from "react";

// Create the Workout Context
export const WorkoutContext = createContext();

// Reducer function to handle different actions
export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "GET_USER_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

// Context Provider component
export const WorkoutContextProvider = ({ children }) => {
  // Set the initial state to an empty array for workouts
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: [], // Initialize as an empty array
  });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
