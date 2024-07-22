import { render } from "preact";
import { App } from "./app.jsx";
import "./index.css";
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "./components/Login/AuthContext.jsx";
render(
  <React.StrictMode>
    <AuthProvider>
      <Auth0Provider
        domain="dev-inrnnc718gwzbtxp.us.auth0.com"
        clientId="5du5TN8OqC2lKeuqPkAqch6TDwXDgIxI"
        authorizationParams={{ redirect_uri: window.location.origin }}
      >
        {" "}
        {/* Wrap AuthProvider around your App */}
        <App />
      </Auth0Provider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("app")
);
