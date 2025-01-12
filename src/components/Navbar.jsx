import React from 'react'
import { Link } from "react-router-dom";
import "./Navbar.css"

export default function Navbar() {
  return (
    <>
       <header className="navbar">
        <div className="logo">HealthHub</div>
          <nav className="nav-links">
            <a href="/">Home</a>
            <a href="#disease-detection">Disease Detection</a>
            <Link to="/order-medicines">Order Medicine</Link>
            <a href="#consult-doctor">Consult a Doctor</a>
            <a href="#medicine-schedule">Medicine Schedule</a>
            <a href="#medical-records">Medical Records</a>
            <a href="#about">About Us</a>
          </nav>
        <div className="auth-links">
          <a href="#login" className="login-btn">Login</a>
          <a href="#signup" className="signup-btn">Sign Up</a>
        </div>
      </header>
    </>
  )
}
