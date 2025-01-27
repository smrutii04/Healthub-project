import React from 'react'
import { Link } from "react-router-dom";
import "./Navbar.css"
import Alert from './E-Pharmacy/Products/Alert';

export default function Navbar() {

  const user = JSON.parse(localStorage.getItem('user')); // Get user from local storage
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user from local storage
    <Alert message='Logged out successfully!'/>
    window.location.reload(); // Refresh to update the navbar
  };
  return (
    <>
       <header className="navbar">
        <div className="logo">HealthHub</div>
          <nav className="nav-links">
            <a href="/">Home</a>
            <a href="/disease-detection">Disease Detection</a>
            <Link to="/order-medicines">Order Medicine</Link>
            <Link to="/book">Consult a Doctor</Link>
            <Link to="/medicine-schedule">Medicine Schedule</Link>
            <a href="/medical-records">Medical Records</a>
           
          </nav>
        <div className="auth-links">
        {user? (
           // Show logged-in user's name and a Logout link
           <>
            <span>Welcome, {user.fullName}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
        ):
        (<>
          <Link to="/choice-page" className="login-btn">Login</Link>
          <Link to="/choice-page" className="signup-btn">Sign Up</Link>
        </>)}

        
        </div>
      </header>
    </>
  )
}
