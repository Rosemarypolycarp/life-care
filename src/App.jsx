import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import Appointment from "./pages/Appointment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { Context } from "./main";
import Footer from "./components/footer";
import Loading from "./components/loading";


//life care App Entry
const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("doctors")) {
      const sampleDoctors = [
        { firstName: "John", lastName: "Doe", doctrDptmnt: "Pediatrics" },
        { firstName: "Sarah", lastName: "Lee", doctrDptmnt: "Cardiology" },
        { firstName: "Mark", lastName: "Paul", doctrDptmnt: "Orthopedics" },
      ];

      localStorage.setItem("doctors", JSON.stringify(sampleDoctors));
    }
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    } else {
      setUser({});
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
