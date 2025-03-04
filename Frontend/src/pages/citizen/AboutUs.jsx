import React from 'react';
import '../../scss/aboutUs.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AboutUs = () => {
  return (
    <div className="about-us-page">
            <FontAwesomeIcon
                icon={faArrowLeft}
                className="back-button"
                onClick={() => window.history.back()}
            />
            
      <h1>About Us</h1>

      <section className="section">
        <h2>Our Mission</h2>
        <p>
          At Extreme Service Delivery, our mission is to provide exceptional
          and efficient services to our community. We strive to enhance the
          quality of life by addressing key issues swiftly and effectively.
        </p>
      </section>

      <section className="section">
        <h2>Our Team</h2>
        <p>
          Our dedicated team is composed of passionate individuals with a
          shared commitment to improving community services. From our
          administrative staff to our field agents, everyone plays a crucial
          role in ensuring the smooth operation of our services.
        </p>
      </section>

      <section className="section">
        <h2>Our Values</h2>
        <ul>
          <li>Integrity: We uphold the highest standards of honesty and transparency.</li>
          <li>Commitment: We are dedicated to delivering the best service possible.</li>
          <li>Innovation: We continuously seek to improve our processes and solutions.</li>
          <li>Customer Focus: We prioritize the needs and satisfaction of our users.</li>
        </ul>
      </section>

      <section className="section">
        <h2>Contact Us</h2>
        <p>
          If you have any questions or need further information, feel free to
          reach out to us at <a className='email-link' href="mailto:info@extremeservice.com">info@extremeservice.com</a> or
          call us at (123) 456-7890. We are here to assist you and provide
          the support you need.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
