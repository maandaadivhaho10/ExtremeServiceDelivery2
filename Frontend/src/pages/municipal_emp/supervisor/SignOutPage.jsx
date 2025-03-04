import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../scss/Supervisor/SignOutPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tickImage from '../../../assets/logouttick.png'; 
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

const SignOutPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    navigate('/suplanding');
  };

  const handleConfirmSignOut = () => {

    localStorage.clear();
    
    // Handle sign-out logic here
    setIsPopupOpen(false);
    navigate('/');
  };

  return (
    <div className="signout-page">
      <button onClick={handleSignOutClick}>Sign Out</button>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <FontAwesomeIcon icon={faTriangleExclamation} className='warning-icon'/>
            <h2 className='sign-out-txt'>Sign Out</h2>
            <p>Are you sure you want to sign out?</p>
            <p>You will need to log in again to access the app.</p>
            <div className="popup-actions">
              <button className="btn-confirm" onClick={handleConfirmSignOut}>Yes, sign me out</button>
              <button className="btn-cancel" onClick={() => window.history.back()}>No, keep me logged in</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignOutPage;
