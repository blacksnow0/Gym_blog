import { useContext } from "react";
import { WorkoutContext } from "../context/workoutContext";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw Error("WorkoutContext can not be use outside WorkoutContextProvider");
  }
  return context;
};
