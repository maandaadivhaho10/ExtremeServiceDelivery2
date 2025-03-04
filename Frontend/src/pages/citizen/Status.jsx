import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../../scss/status.scss';

function Status() {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/issue/my-issues', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setIssues(response.data);
            } catch (error) {
                console.error(error);
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert('An error occurred while fetching issues.');
                }
            }
        };

        fetchIssues();
    }, []);

    return (
        <div>
            <FontAwesomeIcon
                icon={faArrowLeft}
                className="back-button"
                onClick={() => window.history.back()}
            />
            <div className='status-heading'>
                <h1>Reported Issues status</h1>
            </div>

            {/* Wrap the report-details in a reports-grid container */}
            <div className="reports-grid">
                {issues.length > 0 ? (
                    issues.map((issue, index) => (
                        <div key={index} className='report-details'>
                            <h2>Issue Details</h2>
                            <div className='details-container'>
                                <div className='row'>
                                    <div className='description'>
                                        <p><strong>Description:</strong> {issue.description}</p>
                                    </div>
                                    <div className='issue-type'>
                                        <p><strong>Issue Type:</strong> {issue.issueCategory}</p>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='report-date'>
                                        <p><strong>Report Date:</strong> {new Date(issue.dateReported).toLocaleDateString()}</p>
                                    </div>
                                    <div className='issue-status'>
                                        <p className='is-status'><strong className='status'>Status:</strong> {issue.status}</p>
                                    </div>
                                </div>

                                {issue.issue_image_path && (
                                    <div className="issue-image">
                                        <img src={`http://localhost:5000${issue.issue_image_path}`} alt="Issue" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No issues reported yet.</p>
                )}
            </div>
            <div className="button-container">
  <Link to='/homepage'>
    <button type='button' className='done-btn'>Done</button>
  </Link>
</div>

        </div>
    );
}

export default Status;
