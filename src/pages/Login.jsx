import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

  l
    const user = users.find((u) => u.email === email);

    if (!user) {
      toast.error("User not found. Please register.");
      return;
    }

  
    if (user.password !== password) {
      toast.error("Incorrect password.");
      return;
    }

   
    localStorage.setItem("loggedInUser", JSON.stringify(user));

   
    setUser(user);

    toast.success("Login successful!");
    setIsAuthenticated(true);
    navigateTo("/");
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container form-component login-form">
      <h2>Login</h2>
      <p>Please log in to continue</p>
      <p>
        Welcome to Life Care.
         Manage your appointments, stay connected with your healthcare provider, and access services securely.
      </p>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Not Registered?</p>
          <Link to="/register" style={{ textDecoration: "none" }}>
            Register Now
          </Link>
        </div>

        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;