import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const userExists = existingUsers.find((u) => u.email === email);

    if (userExists) {
      toast.error("Email already registered!");
      return;
    }

    const newUser = {
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      aadhar,
      dob,
      role: "Patient",
    };

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    toast.success("Registration successful!");
    setIsAuthenticated(true);
    navigateTo("/");
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="container form-component register-form">
      <h2>Sign Up</h2>
      <p>Please Signup to Continue</p>
      <p>
        Get Started Fill out the form below to create your Life Care Hospital
        account. Your information is safe with us, and we are committed to
        maintaining your privacy and security.
      </p>

      <form onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            value={phone}
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <input
            type="number"
            value={aadhar}
            placeholder="Aadhar Number"
            onChange={(e) => setAadhar(e.target.value)}
          />
          <input
            type="date"
            value={dob}
            placeholder="Date of Birth"
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Already Registered?</p>
          <Link
            to={"/login"}
            style={{ textDecoration: "none", alignItems: "center" }}
          >
            Login Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
