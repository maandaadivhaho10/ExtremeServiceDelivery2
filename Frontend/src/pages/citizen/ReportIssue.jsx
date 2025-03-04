import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../scss/reportIssue.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ReportIssue = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        location: '',
        description: '',
        issueCategory: ''
    });
    const [photo, setPhoto] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    // Geolocation to get live location
    const handleGetLocation = () => {
        if (navigator.geolocation) {
            setLoadingLocation(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        // Optionally, you can reverse geocode this into a human-readable address using an API (e.g., Google Maps)
                        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                        const address = response.data.display_name;
                        setFormData({ ...formData, location: address });
                    } catch (error) {
                        console.error('Error getting address:', error);
                        alert('Failed to fetch location. Please enter manually.');
                    } finally {
                        setLoadingLocation(false);
                    }
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    alert('Unable to fetch location. Please enter it manually.');
                    setLoadingLocation(false);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formDataToSend = new FormData();

            formDataToSend.append('location', formData.location);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('issueCategory', formData.issueCategory);
            if (photo) {
                formDataToSend.append('photo', photo);
            }

            const response = await axios.post(
                'http://localhost:5000/api/issue/report-issue',
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            alert(response.data.message);
            navigate('/homepage');
        } catch (error) {
            console.error(error);
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className='goback-button'>
            <FontAwesomeIcon
                icon={faArrowLeft}
                className="back-button"
                onClick={() => window.history.back()} 
            />
            <div className="container">
                <h1>Report Issue</h1>
                <p className='ppp1'>Please provide issue details below:</p>
                <form className='form1' onSubmit={handleSubmit}>
                    <label className='labels' htmlFor="issueCategory">Select an issue below:</label>
                    <select
                        id="issueCategory"
                        name="issueCategory"
                        value={formData.issueCategory}
                        onChange={handleChange}
                    >
                        <option value="" disabled hidden>Issue Categories</option>
                        <option value="electricity">Power & Electricity</option>
                        <option value="water">Water & Sanitation</option>
                        <option value="road">Road & Traffic</option>
                        <option value="infrastructure">Infrastructure</option>
                        <option value="waste">Waste Management</option>
                        <option value="safety">Public Safety</option>
                        <option value="public">Public Facilities</option>
                        <option value="other">Other</option>
                    </select>

                    <label className='labels' htmlFor="description">Description of issue:</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        placeholder="Describe the issue in detail"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>

                    <label className='labels' htmlFor="location">Location:</label>
                    <div className="location-container">
                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Enter location or use GPS"
                            value={formData.location}
                            onChange={handleChange}
                        />

                        <button
                            type="button"
                            className='gps-button'
                            onClick={handleGetLocation}
                            disabled={loadingLocation}
                        >
                            {loadingLocation ? 'Fetching...' : <FontAwesomeIcon icon={faLocationArrow} />}
                            {' '}current location
                        </button>
                    </div>

                    <label className='labels' htmlFor="photo">Upload Photo (optional):</label>
                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        accept="image/*"
                        onChange={handlePhotoChange}
                    />

                    <button type="submit" className='submit-issue-button'>Report</button>
                </form>
            </div>
        </div>
    );
}

export default ReportIssue;
