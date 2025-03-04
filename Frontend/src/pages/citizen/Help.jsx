import React from 'react';
import '../../scss/help.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Help = () => {
  return (
    <div className='help-page'>
           <FontAwesomeIcon
                icon={faArrowLeft}
                className="back-button"
                onClick={() => window.history.back()}
            />
            
    <div className="help-page-content">
      <h1>Help</h1>

      <section className="section">
        <h2>Introduction</h2>
        <p>
          Welcome to the Extreme Service Delivery portal! This platform allows you to report issues, confirm resolutions, and stay updated on service status in your area.
        </p>
      </section>

      <section className="section">
        <h2>Getting Started</h2>
        <h3>Creating an Account</h3>
        <ol>
          <li  className='listt'>Click on the "Sign Up" button on the homepage.</li>
          <li  className='listt'>Fill in your details including name, surname, address, email, contact details, and password.</li>
          <li  className='listt'>Click "Sign Up" to create your account.</li>
        </ol>

        <h3>Logging In</h3>
        <ol>
          <li  className='listt'>Enter your email and password on the login page.</li>
          <li  className='listt'>Click "Login" to access your account.</li>
        </ol>
      </section>

      <section className="section">
        <h2>Using the Portal</h2>
        <h3>Reporting an Issue</h3>
        <ol>
          <li  className='listt'>Click on "Report Issue" from the homepage.</li>
          <li  className='listt'>Select the category of your issue (crime, electricity, water, other).</li>
          <li  className='listt'>Provide a detailed description and location of the issue.</li>
          <li  className='listt'>Click "Submit" to report the issue.</li>
        </ol>

        <h3>Confirming Issue Resolution</h3>
        <ol>
          <li  className='listt'>Navigate to the "Confirm Issue Resolution" page.</li>
          <li  className='listt'>Find the issue you reported and click "Confirm" if it has been resolved.</li>
        </ol>

        <h3>Viewing Issue Status</h3>
        <ol>
          <li  className='listt'>Click on "View Issue Status" from the homepage.</li>
          <li  className='listt'>Browse through your reported issues to check their status.</li>
        </ol>
      </section>

      <section className="section">
        <h2>FAQ</h2>
        <h3>How do I reset my password?</h3>
        <p>
          Click on "Forgot Password" on the login page and follow the instructions to reset your password.
        </p>
      </section>

      <section className="section">
        <h2>Troubleshooting</h2>
        <h3>Login Issues</h3>
        <p>
          Ensure you are entering the correct email and password. If you forgot your password, use the "Forgot Password" link to reset it.
        </p>

        <h3>Reporting Issues</h3>
        <p>
          Make sure all required fields are filled out. If you encounter an error, try refreshing the page or logging out and back in.
        </p>
      </section>

      <section className="section">
        <h2>Contact Support</h2>
        <p>
          For further assistance, please contact our support team at <a href="mailto:support@extremeservice.com">support@extremeservice.com</a> or call (123) 456-7890. Our support team is available from 9 AM to 5 PM, Monday to Friday.
        </p>
      </section>

      <section className="section">
        <h2>User Guidelines and Policies</h2>
        {/* <p>Please review our <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a> to understand how we handle your data and the rules for using our portal.</p> */}
      </section>
    </div>
    </div>
  );
};

export default Help;
