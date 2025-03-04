import React, { useState } from 'react';
import '../../../scss/Supervisor/IssuesComponent.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


// Sample data (this would normally come from an API)
const reportedIssues = [
  {
    id: 1,
    reporter: 'John Doe',
    issue: 'We have dirty tap water.',
    dateReported: '2024-08-01',
    location: 'Main St. & 5th Ave.',
  },
  {
    id: 2,
    reporter: 'Jane Smith',
    issue: 'There is no electricity',
    dateReported: '2024-08-02',
    location: 'Elm St. & Oak St.',
  },
  {
    id: 3,
    reporter: 'Alice Johnson',
    issue: 'Pipe burst',
    dateReported: '2024-08-03',
    location: 'Maple St. & 6th Ave.',
  },
];

const IssuesComponent = () => {
 {/* const [posts, setPosts] = useState([
    { id: 1, user: 'Sihle', time: '3hr ago', location: 'Ezibeleni Ext 9', content: 'There is a pipe bust near the Khanyisa Church', comments: 20, likes: 80, status: 0 },
    { id: 2, user: 'Buhle Masilela', time: '3d ago', location: 'Location', content: 'There is no water in Klipfontain', comments: 0, likes: 34, status: 0 },
    { id: 3, user: 'Sibusiso Mawelela', time: '3d ago', location: 'Bun Fur', content: 'We have dirty tap water', comments: 3, likes: 34, status: 0 },
    { id: 4, user: 'Thabiso McD', time: '3d ago', location: 'Delkudor', content: 'Its been 2 days no response to the water crisis here in Delkudor', comments: 0, likes: 34, status: 0 },
  ]);


  const handleStatusChange = (id, newStatus) => {
    setPosts(posts.map(post => post.id === id ? { ...post, status: newStatus } : post));
  };
*/}
  return (
  
    <div className="reported-issues-page">
  <FontAwesomeIcon
        icon={faArrowLeft}
        className="back-button"
        onClick={() => window.history.back()} // Go back to the previous page
      />

    <h1>Reported Issues</h1>
    <div className="issues-list">
      {reportedIssues.map(issue => (
        <div key={issue.id} className="issue-card">
          <h2>{issue.issue}</h2>
          <p><strong>Reported by:</strong> {issue.reporter}</p>
          <p><strong>Date Reported:</strong> {issue.dateReported}</p>
          <p><strong>Location:</strong> {issue.location}</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default IssuesComponent;
