import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
 
import '../../../scss/supervisor/shelppage.scss';
import questionMarkImage from '../../../assets/QuestionMark.jpg'; 

const HelpPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="help-page-container">
      <div className="content">
        <div className="back-arrow" onClick={handleBackClick}>
          ←
        </div>
        <img src={questionMarkImage} alt="Question Mark" className="help-image" width={100} />
        <h5>How can we help you?</h5>
        <hr />
        <p>Type below</p>
        <div className="textarea-container">
          <textarea className="textarea" placeholder="Enter your problem here..."></textarea>
        </div>
        <br />
        <button className="submit-button">Submit</button>
      </div>
    </div>
  );
}

export default HelpPage;
