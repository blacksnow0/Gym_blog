import { useLoadingContext } from "../context/loadingContext";
import { useState, useEffect } from "react";

const Loader = () => {
  const { loading } = useLoadingContext();
  const [dots, setDots] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prev) => {
        // Add a dot, and reset if it reaches 3 dots
        return prev.length < 3 ? prev + "." : "";
      });
    }, 500); // Change the interval as needed (500 ms for this example)

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [loading]);
  return (
    loading && (
      <div className="loading-screen">
        <h2>Loading{dots}</h2>
      </div>
    )
  );
};

export default Loader;
