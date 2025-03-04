import React, { useState } from 'react';
import axios from 'axios';
import '../../scss/forgotPassword.scss'; // Your SCSS styling

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage('If the email exists, you will receive a password reset link.');
    } catch (error) {
      setMessage('Error sending reset link. Please try again.');
    }
  };

  return (
    <div className="forgot-password-page">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email address:</label>
        <input
          type="email"
          id="email"
          placeholder='youremail@gmail.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className='resend-btn'>Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
      <a href="/login" className="close-button">Close</a>
    </div>
  );
};

export default ForgotPasswordPage;
