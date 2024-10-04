import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuthContext } from "./hooks/useAuthContext";
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";
import UserDashboard from "./pages/UserDashboard";
import Sidebar from "./components/Sidebar";
function App() {
  const { user, authIsReady } = useAuthContext();
  const location = useLocation();

  const showNavbarAndSidebar =
    location.pathname !== "/login" && location.pathname !== "/register";

  if (!authIsReady) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Navbar />
      <div className={`layout ${!showNavbarAndSidebar ? "with-sidebar" : " "}`}>
        {showNavbarAndSidebar && <Sidebar />}
        <Loader />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/user"
              element={user ? <UserDashboard /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
