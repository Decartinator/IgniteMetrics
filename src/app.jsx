import { useState } from "preact/hooks";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import "./app.css";
import Login from "./pages/LoginPage/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/Login/LoginForm/ProtectedRoute";
import { useAuth0 } from "@auth0/auth0-react";
import { GridLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCog,
  faBell,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import Profile from "./pages/ProfilePage/Profile";
import SignupPage from "./pages/SignUpPage/SignUpPage";
import TestLocalStorage from "./pages/TestLocalStorage";

// Custom Auth Context (if you have one)
import { useAuth } from "./components/Login/AuthContext";
const LogoutButton = () => {
  const { logout } = useAuth0();
  const { signOut } = useAuth();
  const { isAuthenticated, isLoading } = useAuth0();
  const { isAuthenticated: isAuthenticatedCustom } = useAuth(); // If using custom auth context
  localStorage.removeItem("isAuthenticated");

  return (
    <Link
      to="/"
      className="absolute bottom-0 left-4 w-3/4 px-4 py-3 text-center bg-red-600  text-white font-bold text-sm rounded-lg mb-4"
      onClick={() => {
        if (isAuthenticated) {
          logout({ returnTo: window.location.origin });
        } else {
          signOut();
        }
      }}
    >
      Logout
    </Link>
  );
};

export function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const { isAuthenticated: isAuthenticatedCustom } = useAuth(); // If using custom auth context

  let [color, setColor] = useState("#224d8f");

  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <GridLoader color={color} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden">
        <div
          className={`bg-gray-100 text-white w-1/4 flex flex-col pl-4 max-w-64 relative ${
            !isAuthenticated && !isAuthenticatedCustom && "hidden"
          }`}
        >
          {/* Title */}
          <div className="px-6 py-3 text-xl font-bold text-black mt-10 mb-10">
            {activeMenuItem}
          </div>
          {/* Menu Items */}
          <Link
            to="/dashboard"
            className={`flex items-center justify-start px-4 py-3 ${
              activeMenuItem === "Dashboard"
                ? "bg-gray-700 text-gray-200 font-bold text-sm rounded-lg"
                : "text-gray-700 font-bold text-sm"
            }`}
            onClick={() => handleMenuItemClick("Dashboard")}
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Dashboard
          </Link>
          <Link
            to="/profile"
            className={`flex items-center justify-start px-4 py-3 ${
              activeMenuItem === "Profile"
                ? "bg-gray-700 text-gray-200 font-bold text-sm rounded-lg"
                : "text-gray-700 font-bold text-sm"
            }`}
            onClick={() => handleMenuItemClick("Profile")}
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profile
          </Link>
          <Link
            to="/settings"
            className={`flex items-center justify-start px-4 py-3 ${
              activeMenuItem === "Settings"
                ? "bg-gray-700 text-gray-200 font-bold text-sm rounded-lg"
                : "text-gray-700 font-bold text-sm"
            }`}
            onClick={() => handleMenuItemClick("Settings")}
          >
            <FontAwesomeIcon icon={faCog} className="mr-2" />
            Settings
          </Link>
          <Link
            to="/notifications"
            className={`flex items-center justify-start px-4 py-3 ${
              activeMenuItem === "Notifications"
                ? "bg-gray-700 text-gray-200 font-bold text-sm rounded-lg"
                : "text-gray-700 font-bold text-sm"
            }`}
            onClick={() => handleMenuItemClick("Notifications")}
          >
            <FontAwesomeIcon icon={faBell} className="mr-2" />
            Notifications
          </Link>
          <Link
            to="/messages"
            className={`flex items-center justify-start px-4 py-3 ${
              activeMenuItem === "Messages"
                ? "bg-gray-700 text-gray-200 font-bold text-sm rounded-lg"
                : "text-gray-700 font-bold text-sm"
            }`}
            onClick={() => handleMenuItemClick("Messages")}
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            Messages
          </Link>
          {/* Logout Button */}
          <LogoutButton />
        </div>
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated || isAuthenticatedCustom ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />

            <Route
              path="/profile"
              element={<ProtectedRoute element={<Profile />} />}
            />

            <Route path="/test" element={<TestLocalStorage />} />

            <Route path="/signup" element={<SignupPage />} />
            {/* Add more Route components for other paths as needed */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
