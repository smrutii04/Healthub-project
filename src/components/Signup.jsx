import React, { useState } from 'react';
import './Signup.css'; // Importing the CSS file
import Alert from './E-Pharmacy/Products/Alert';

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    // Here, you would handle the signup logic (e.g., API call)
    console.log("Signup attempted with", fullName, email, password);
    try{
      const response = await fetch("http://localhost:5000/api/patients/signup", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({fullName, email, password})
      });

      if(response.status === 201)
      {
        <Alert message = "Signup successful!! Now you can Login" />
        setFullName('');
        setEmail('');
        setPassword('');
      }
      else if (response.status === 409) {
        alert('User already exists. Please login.');
      } else {
        alert('An error occurred. Please try again.');
      }

    }
    catch(error)
    {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              value={fullName}
              autoComplete="name"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password" 
            />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
          {/* <p>Already an User? <Link to="/login-patient">Login  </Link></p> */}
        </form>
      </div>
    </div>
  );
}

export default Signup;
