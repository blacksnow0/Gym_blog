import React from "react";
import "../styles/UserPage.css";
// import { FaDumbbell, FaRedoAlt } from "react-icons/fa"; // Import icons

const UserGrid = ({ workouts }) => {
  return (
    <div className="user-grid">
      <h2 className="grid-header">Your Workouts..</h2>
      <table className="workout-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Load (kg)</th>
            <th>Repetitions</th>
          </tr>
        </thead>
        <tbody>
          {workouts.length > 0 ? (
            workouts.map((workout) => (
              <tr key={workout._id} className="workout-row">
                <td>{workout.title}</td>
                <td>
                  <span className="load">{workout.load}</span>
                </td>
                <td>{workout.reps}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No workouts found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserGrid;
