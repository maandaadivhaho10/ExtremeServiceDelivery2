import React from 'react';
import '../../../scss/Supervisor/ReportUnresolved.scss';

const ReportUnresolved = () => {
  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Report on unresolved Issues</h2>
        <form>
          <div className="input-group">
            <input type="email" placeholder="Email*" required />
          </div>
          <div className="input-group">
            <textarea placeholder="Your Message" required></textarea>
          </div>
          <button type="submit">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default ReportUnresolved;
