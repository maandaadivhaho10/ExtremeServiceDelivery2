import React, { useState, useEffect } from 'react';
import '../../../scss/Admin/issuepanding.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const IssuePading = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 9738, description: 'Water leakage' },
            { id: 9865, description: 'Electrical outage' },
            { id: 6961, description: 'Waste removal' },
            { id: 3625, description: 'Cable theft' },
            { id: 8459, description: 'Sewage leak' },
            { id: 3254, description: 'Transformer bust' },
            { id: 9542, description: 'Pipe burst' },
            { id: 5623, description: 'Light out' },
          ]);
        }, 1000);
      });

      setIssues(response);
    };

    fetchIssues();
  }, []);

  return (
    <div>
    <div className="pending-issues-container">
      <header className="header">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="back-button"
          onClick={() => window.history.back()}
        />
        <h1>Reports</h1>
      </header>

      <div className="header">
        <h1>Pending Issues</h1>
      </div>
      
      <Link to='/issuedetail'><div className="issues-grid">
        {issues.length > 0 ? (
          issues.map((issue) => (
            <div key={issue.id} className="issue-card">
              <h2>ID: {issue.id}</h2>
              <p>{issue.description}</p>
            </div>
          ))
        ) : (
          <p>Loading issues...</p>
        )}
      </div></Link>

    
    </div>
    <footer className="footer">
        <Link to='/monthly'><button className="footer-button">Monthly Report</button></Link>
        <Link to='/issuedetail'><button className="footer-button">Issue Report</button></Link>
      </footer>
    </div>
  );
};

export default IssuePading;
