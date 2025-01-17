import React, { useState } from 'react';
import './Login.css'; // Importing the CSS file
import Alert from './E-Pharmacy/Products/Alert';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    // Here, you would handle the login logic (e.g., API call)
    console.log("Login attempted with", email, password);
    try{
      const response = await fetch("http://localhost:5000/api/patients/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password})
      });


      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(data.user));  
        localStorage.setItem('userId', JSON.stringify(data.user._id));  
        <Alert message="Login successful"/>
        const userId = JSON.parse(localStorage.getItem('userId'));
        navigate(`/${userId}`);
        window.location.reload();

      }
      else {
        <Alert message={data.message}/>// Show error message from backend
      }
    }
    catch(error)
    {
      console.log('Error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
