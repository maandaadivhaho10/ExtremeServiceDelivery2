import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import '../../../scss/Admin/monthlydetail.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

import img2 from '../../../assets/road_potholes.webp';
import img3 from '../../../assets/water.jpg';
import img4 from '../../../assets/pothole2.jpg';
import img5 from '../../../assets/road1.jpg';
import img6 from '../../../assets/pothole1.jpg';
import img7 from '../../../assets/Live-wires-from-electricity-thieves1.jpg';
import img8 from '../../../assets/pipe3.jpg';
import img9 from '../../../assets/infrastructure.jpg';
import img10 from '../../../assets/elect2.jpg';

const images = [img2, img3, img4, img5, img6, img7, img8, img9, img10];

const IssueDetail = () => {
  const location = useLocation();
  const { startDate, endDate, reports } = location.state || { startDate: "No Date Selected", endDate: "No Date Selected", reports: [] };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add Report Title and Dates
    doc.text('Report Details', 10, 10);
    doc.text(`From: ${startDate}`, 10, 20);
    doc.text(`To: ${endDate}`, 10, 30);

    // Add Reported Issues
    doc.text('Issues Reported:', 10, 40);
    reports.forEach((report, index) => {
      doc.text(`${index + 1}. ${report.content}`, 10, 50 + (index * 10));
    });

    // Add a space before the next section
    const lastIssuePosition = 50 + reports.length * 10;

    // Add Pending Issues
    doc.text('Pending Issues:', 10, lastIssuePosition + 10);
    doc.text('Dummy data', 10, lastIssuePosition + 20);

    // Add Resolved Issues
    doc.text('Resolved Issues:', 10, lastIssuePosition + 30);
    doc.text('Dummy resolved data', 10, lastIssuePosition + 40);

    // Add Department Comments
    doc.text('Department Comments:', 10, lastIssuePosition + 50);
    doc.text('Dummy comments', 10, lastIssuePosition + 60);

    // Add Supervisor Comments
    doc.text('Supervisors\' Comments on Pending Issues:', 10, lastIssuePosition + 70);
    doc.text('Dummy supervisor comments', 10, lastIssuePosition + 80);

    // Add Community Comments
    doc.text('Community Comments:', 10, lastIssuePosition + 90);
    doc.text('Dummy comments', 10, lastIssuePosition + 100);

    // Save the PDF with a custom filename
    doc.save(`report_${startDate}_to_${endDate}.pdf`);
  };

  return (
    <div className="report-container">
      <div className="header">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="back-button"
          onClick={() => window.history.back()}
        />
        <h1>Report Details</h1>
      </div>
      <div className="content">
        <div className="left-section">
          <h5>{`From: ${startDate}`} {`To: ${endDate}`}</h5>
          <div className="image-slideshow">
            <img src={images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} />
          </div>
          <button className="download-button" onClick={handleDownloadPDF}>
            Download Report (PDF)
          </button>
        </div>
        <div className="right-section">
          <h3>Issues Reported:</h3>
          <ul>
            {reports.map((report, index) => (
              <li key={index}>{report.content}</li>
            ))}
          </ul>
          <h3>Pending Issues:</h3>
          <ul>
            {reports.filter(report => report.status === 'pending').map((report, index) => (
              <li key={index}>{report.content}</li>
            ))}
          </ul>
          <h3>Resolved Issues:</h3>
          <ul>
            {reports.filter(report => report.status === 'resolved').map((report, index) => (
              <li key={index}>{report.content}</li>
            ))}
          </ul>
          <h3>Supervisors' Comments on Pending Issues:</h3>
          <ul>
            {reports.filter(report => report.status === 'pending').map((report, index) => (
              <li key={index}>{report.supervisorComment || 'No comments available'}</li>
            ))}
          </ul>
          
        </div>
      </div>
      <div className="footer">
        {/* Footer content can go here */}
      </div>
    </div>
  );
};

export default IssueDetail;
