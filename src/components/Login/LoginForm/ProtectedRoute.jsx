import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { RingLoader, GridLoader } from "react-spinners";
import { useAuth } from "../AuthContext";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { isAuthenticated: isAuthenticatedCustom } = useAuth(); // Use custom authentication state

  if (isLoading) {
    return <GridLoader />;
  }

  if (!isAuthenticated && !isAuthenticatedCustom) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
