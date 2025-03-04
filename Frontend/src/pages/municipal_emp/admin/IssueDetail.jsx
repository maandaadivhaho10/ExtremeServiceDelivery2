import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faDownload } from '@fortawesome/free-solid-svg-icons';
import '../../../scss/Admin/issuedetail.scss';

const IssueDetail = () => {
  return (
    <div className="issue-detail-container">
      <div className="header">
        <FontAwesomeIcon icon={faArrowLeft} className="back-button" onClick={() => window.history.back()} />
        <span className="issue-id">Issue: 1738</span>

      </div>

      <div className="issueDetail">
        
          <div className="issue-info-card">
            <p><strong>ADDRESS</strong></p>
            <p>123 W 4 St, Model Park, Witbank</p>
            <p><strong>Supervisor EMAIL</strong></p>
            <p className="email">email@gmail.com</p>
            <p><strong>Department</strong></p>
            <p>Water</p>
          </div>
        </div>

      
    </div>
  );
};

export default IssueDetail;
