import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../scss/OtpInputPage.scss';
import axios from 'axios';

const OtpInput = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [countdown, setCountdown] = useState(90); // Timer for OTP expiration
  const [canResend, setCanResend] = useState(false);

  // Retrieve email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const MaskedEmail = localStorage.getItem('maskedEmail');

    if (storedEmail && MaskedEmail) {
      setEmail(storedEmail);
      setMaskedEmail(MaskedEmail);
    } else {
      alert('No email found, please log in again.');
      navigate('/login'); // Redirect to login if no email is found
    }
  }, [navigate]);

  // Countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          setCanResend(true); // Allow OTP resend after 90 seconds
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer); // Clean up timer on unmount
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { otp };

    try {
      const response = await axios.post(`http://localhost:5000/api/auth/verify-otp/${email}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { user, token } = response.data;

      // Store token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.roleName);
      localStorage.setItem('user', JSON.stringify(user));

      console.log(user.roleName);
      // Navigate based on roleName
      switch (user.roleName) {
        case 'RESIDENT':
          navigate('/homepage');
          break;
        case 'ADMIN':
          navigate('/adminhome');
          break;
        case 'MANAGER':
          navigate('/landing');
          break;
        case 'SUPERVISOR':
          navigate('/suplanding');
          break;
        default:
          alert('You do not have the right role to access this page.');
          break;
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        console.error('Error:', error.message);
        alert('An error occurred. Please try again.');
      }
    }
  };

  const resendOtp = async () => {
    try {
      await axios.post(`http://localhost:5000/api/auth/resend-otp/${email}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('A new OTP has been sent to your email.');
      setCountdown(90); // Restart countdown
      setCanResend(false); // Disable resend button
    } catch (error) {
      alert('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div className="otp-container">
      {email ? (
        <>
          <h1>A One Time Pin has been sent to {maskedEmail}. <Link to="/login">Not you?</Link></h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={otp}
              onChange={handleChange}
              maxLength="6"
              className="otp-input"
              placeholder="Enter OTP"
            />
            <button type="submit" className="submit-otp">
              Submit
            </button>
          </form>


          {/* Resend OTP */}
          {canResend ? (
            <p>
              <a href="#!" onClick={resendOtp}>Resend OTP</a>
            </p>
          ) : (
            <p>Resend OTP in {countdown} seconds</p>
          )}
        </>
      ) : (
        <h1>Loading...</h1> // Show this if email is not set yet
      )}
    </div>
  );
};

export default OtpInput;
