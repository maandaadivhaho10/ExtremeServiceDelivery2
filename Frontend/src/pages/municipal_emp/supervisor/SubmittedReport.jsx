import React from 'react';
import { Link } from 'react-router-dom';

import tickImage from '../../../assets/tick_87932.png';// Adjust the path based on your file structure

import '../../../scss/Supervisor/SubmittedReport.scss';
const SubmittedReport = () => {
  return (
    <div className="submitted-report-container">
      <div className="content">
        <img src={tickImage} alt="Tick" className="tick-image" />
        <h3>You have successfully submitted your report!!</h3>
      </div>
      <div className="button-container">
        <Link to= '/suplanding'><button className="menu-button">Menu</button></Link>
        <Link to= '/logoutpage'><button className="logout-button">Logout</button></Link>
      </div>
    </div>
  );
}

export default SubmittedReport;
