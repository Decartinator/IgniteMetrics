// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedAuthState = localStorage.getItem("isAuthenticatedd");
    if (savedAuthState) {
      setIsAuthenticated(JSON.parse(savedAuthState));
    }
  }, []);

  const signIn = async (username, password) => {
    const isValid = await checkCredentials(username, password);

    setIsAuthenticated(isValid);
    if (isValid) {
      localStorage.setItem("isAuthenticatedd", true);
    }
    return isValid;
  };

  const signUp = async (username, password) => {
    const isValid = true; // This should ideally be based on some logic
    if (isValid) {
      const added = await addNewUser(username, password);
      console.log("User added:", added); // Log to confirm user was added
      setIsAuthenticated(added);
      if (added) {
        console.log("Setting localStorage");
        localStorage.setItem("isAuthenticatedd", true);
      }
      return added;
    } else {
      return false;
    }
  };

  const signOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticatedd");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const checkCredentials = async (username, password) => {
  try {
    const response = await fetch(
      "https://ignitemetricapi.azurewebsites.net/api/getNames?"
    );
    const result = await response.json();

    const user = result.find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (user) {
      return password === user.password; // Plain text comparison (for now)
    } else {
      return false; // Username not found
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return false; // Handle fetch error
  }
};

const addNewUser = async (username, password) => {
  try {
    console.log("Adding new user");
    const response = await fetch(
      "https://ignitemetricapi.azurewebsites.net/api/addUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );

    if (response.status === 201) {
      return true;
    } else {
      console.error("Failed to add user. Status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error adding user:", error);
    return false;
  }
};
