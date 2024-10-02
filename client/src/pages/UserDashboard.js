import { useWorkoutContext } from "../hooks/useWorkoutContext";

const UserDashboard = () => {
  const { workouts } = useWorkoutContext();

  console.log(workouts);

  return (
    <div>
      {workouts.map((workout) => (
        <p key={workout._id}>workout</p>
      ))}
    </div>
  );
};

export default UserDashboard;
