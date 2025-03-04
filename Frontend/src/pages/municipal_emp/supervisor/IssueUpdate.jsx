import React, { useState, useEffect } from 'react';
import '../../../scss/Supervisor/IssueUpdate.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const IssueUpdate = () => {
  const [reportedIssues, setReportedIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('dateReported');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        const response = await axios.get('http://localhost:5000/api/supervisor/assigned-issues', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setReportedIssues(response.data); // Populate the state with the fetched data
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchIssues();
  }, []);

  const handleStatusChange = async (issueID, newStatus) => {
    setReportedIssues(prevIssues =>
      prevIssues.map(issue =>
        issue.issueID === issueID ? { ...issue, status: newStatus } : issue
      )
    );

    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      await axios.put(`http://localhost:5000/api/supervisor/update-issue-status/${issueID}`, {
        status: newStatus
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error updating issue status:', error);
      // Handle error accordingly
    }
  };

  const filteredIssues = reportedIssues
  .filter(issue =>
    (issue.reporter && issue.reporter.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (issue.issue && issue.issue.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (issue.location && issue.location.toLowerCase().includes(searchTerm.toLowerCase()))
  )
  .sort((a, b) => {
    if (sortOption === 'dateReported') {
      return new Date(b.dateReported) - new Date(a.dateReported);
    } else if (sortOption === 'reporter') {
      return (a.reporter || '').localeCompare(b.reporter || '');
    } else {
      return (a.location || '').localeCompare(b.location || '');
    }
  });



  return (
    <div className="reported-issues-page">
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="back-button"
        onClick={() => window.history.back()} // Go back to the previous page
      />
      <h1>Reported Issues</h1>
      <div className="controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className='sortbar'
        >
          <option value="dateReported">Sort by Date</option>
          <option value="reporter">Sort by Reporter</option>
          <option value="location">Sort by Location</option>
        </select>
      </div>
      <div className="issues-list">
        {filteredIssues.map(issue => (
          <div key={issue.issueID} className="issue-card">
            <h2 className='nameOfIssue'>{issue.issue}</h2>
            <p><strong>Reported by:</strong> {issue.reporter}</p>
            <p><strong>Date Reported:</strong> {issue.dateReported}</p>
            <p><strong>Location:</strong> {issue.location}</p>
            <p><strong>Status:</strong>
              <select
                value={issue.status}
                onChange={(e) => handleStatusChange(issue.issueID, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Complicated">Complicated</option>
              </select>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssueUpdate;
