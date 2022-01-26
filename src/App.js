import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { ApiClient } from "./apiClient";
import Login from "./Login";
import { Navbar } from "react-bootstrap";


function App() {
  const [token, changeToken] = useState(window.localStorage.getItem("token"));
  const [role, changeRole] = useState("");
  const client = new ApiClient(token, role, () => logout());

  const login = (newToken, newRole) => {
    window.localStorage.setItem("token", newToken);
    changeToken(newToken);
    changeRole(newRole);
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    changeRole("");
    changeToken(undefined);
  };

  
  

  return (
    <>
      {token ? (
        <Dashboard client={client} logout={() => logout()} />
      ) : (
        <Login loggedIn={(token, role) => login(token, role)} client={client} />
      )}
     



    </>
  );
}

export default App;
