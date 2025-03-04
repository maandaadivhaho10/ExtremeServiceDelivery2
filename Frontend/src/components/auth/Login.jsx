import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import img1 from '../../assets/emalahleni.png';
import axios from 'axios';
import '../../scss/login.scss';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

function Login() {
  const navigate = useNavigate();
  const [showForgotPassword, setShowForgotPassword] = useState(false); // Track if "Forgot Password" should be shown

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 && response.data.emailSent) {
        // Store email in localStorage and navigate to OTP page
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('maskedEmail', response.data.maskedEmail)
        
        navigate('/enter-otp');
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);

        // Show "Forgot Password" link for incorrect password
        if (error.response.data.message === 'Incorrect password') {
          setShowForgotPassword(true);
        }
      } else {
        console.error('Error:', error.message);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className='home-page'>
      <div className='login-section'>
        <div className='form-heading'>
          <img src={img1} alt="Login" />
          <h1>Extreme Service Delivery Portal</h1>
          <p>Login to your account.</p>
        </div>
        <br />
        <form onSubmit={handleSubmit}>
          <div className='details-div'>
            <div className="input-container">
              <span className='icon'>
                <FontAwesomeIcon icon={faEnvelope} className='login-icon' />
              </span>
              <input type='email' name='email' placeholder='Email Address' required />
            </div>
          </div>

          {showForgotPassword && (
            <div className='forgot-password'>
              <Link to="/forgotPassword" className="forgot-password-link">Forgot Password?</Link>
            </div>
          )}

          <div className='details-div'>
            <div className="input-container">
              <span className='icon'>
                <FontAwesomeIcon icon={faLock} className='login-icon' />
              </span>
              <input type='password' name='password' placeholder='Password' required />
            </div>
          </div>

          <p>
            Don't have an account? <Link to="/signup" className="signup-link">Sign Up.</Link>
          </p>

          <button type='submit' className='btn-login'>Login</button>

          <Link to='www.google.com'><button className='social-login-btn'><FontAwesomeIcon icon={faGoogle} className='social-icon'/> Login with Google</button></Link>
          <Link to='www.google.com'><button className='social-login-btn'><FontAwesomeIcon icon={faFacebook} className='social-icon'/> Login with Facebook</button></Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
