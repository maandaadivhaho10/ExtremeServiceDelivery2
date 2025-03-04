import React from 'react';

import tickImage from '../../../assets/tick_87932.png'; 

import '../../../scss/Supervisor/StatusUpdated.scss';

const StatusUpdated = () => {
  return (
    <div className="status-updated-container">
        <div className="content">
        <img src={tickImage} alt="Tick" className="tick-image" />
        
      </div>
      <div className="status-text">Status updated</div>
      <div className="buttons">
        <button className="button">menu</button>
        <button className="button">exit</button>
      </div>
    </div>
  );
};

export default StatusUpdated;
