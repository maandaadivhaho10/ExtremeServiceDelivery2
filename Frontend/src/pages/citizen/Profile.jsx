import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../scss/profile.scss'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ProfilePicture from '../../assets/profile_picture.png';
import axios from 'axios';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Use the profilePic path from the user object or fall back to the default image
  const [profilePic, setProfilePic] = useState(user.profilePic ? `http://localhost:5000${user.profilePic}` : ProfilePicture); 

  // Function to handle profile picture update
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);

      try {
        const token = localStorage.getItem('token'); // Ensure you send the token for authentication
        const response = await axios.put(`http://localhost:5000/api/updates/update-profile-picture/${user.id}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        // Update state and localStorage with new profile picture
        const newProfilePic = response.data.profilePic;
        setProfilePic(`http://localhost:5000${newProfilePic}`); // Update with new image URL
        user.profilePic = newProfilePic; // Update the user object
        localStorage.setItem('user', JSON.stringify(user)); // Save updated user info

      } catch (error) {
        console.error('Error updating profile picture:', error);
        alert('Failed to update profile picture. Please try again.');
      }
    }
  };

  return (
    <div className='profile-page'>
      <div className="back-button-container">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="back-button"
          onClick={() => window.history.back()}
        />
      </div>

      <div className="profile-header">
        <img 
          src={profilePic} // Use dynamic profile picture
          alt="Profile"
          className="profile-picture"
        />
        <div className="profile-actions">
          <label className="change-photo-button" htmlFor="file-input">
            Change Photo
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="file-input"
            onChange={handlePhotoChange}
          />
        </div>
        <h2 className="full-name">{user.name} {user.surname}</h2>
      </div>

      <section className="section">
        <h2>Personal Information</h2>
        <p><strong>Username:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Full Name:</strong> {user.name} {user.surname}</p>
        <p><strong>Phone:</strong> {user.contact}</p>
        <p><strong>Address:</strong> {user.address}</p>
      </section>

      <Link to='/editprofile'>
        <button className="edit-profile-button">Edit Profile</button>
      </Link>
    </div>
  );
};

export default Profile;
