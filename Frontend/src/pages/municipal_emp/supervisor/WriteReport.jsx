
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../../../scss/Supervisor/writereport.scss';

const ReportPage = () => {
  const form = useRef();
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs
      .sendForm('service_jiykck6', 'template_37q80a6', form.current, {
        publicKey: 'm2x_uR6CdDFeKNKZW',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          navigate('/SubmittedReport');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  const user = JSON.parse(localStorage.getItem('user'));
  let fullName = user.name +" "+ user.surname;

  return (
    <>
      <div className="home-back-button-container">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="home-back-button"
          onClick={() => window.history.back()}
        />
      </div>
      
      <div className="report-content">
      <br></br>
        <h2>Write report</h2>
        <br></br>
        <h4>Fill in the form to submit the report:</h4>
        <br></br>
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name="from_name" value={fullName} hidden />

          <div className="details-div">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <input
              type="email"
              name="to_email"
              placeholder="Recipient Email"
              className="email-input"
            />
          </div>

          <div className="details-div">
            <FontAwesomeIcon icon={faLock} className="icon" />
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="email-input"
            />
          </div>

          <textarea
            name="message"
            placeholder="Message"
            className="report-textarea"
          />
<br></br>
          <input type="submit" value="Send" className="submit-button" />
        </form>
      </div>
    </>
  );
};

export default ReportPage;