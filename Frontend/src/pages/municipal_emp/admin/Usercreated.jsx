import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../scss/Admin/usercreated.scss';
//import './UserCreated.scss'; // Ensure this path is correct

const UserCreated = () => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    // Handle navigation to the menu
    navigate('/menu'); // Adjust the path as needed
  };

  const handleLogoutClick = () => {
    // Navigate to the logout page
    navigate('/logoutpage');
  };

  return (
    <div className="confirmation-page">
      <div className="confirmation-message">
        <h1>Success!</h1>
        <p>User has been added to the system.</p>
      </div>
      <div className="button-container">
        <button onClick={handleMenuClick} className="btn btn-menu">
          Go to Menu
        </button>
        <button onClick={handleLogoutClick} className="btn btn-logout">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserCreated;
