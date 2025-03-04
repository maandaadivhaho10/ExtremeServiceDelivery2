import React, { useState } from 'react';
import '../../scss/settings.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Settings = () => {
  const [notificationPreference, setNotificationPreference] = useState('email');

  const handlePreferenceChange = (event) => {
    setNotificationPreference(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here
    console.log('Form submitted with:', {
      currentPassword: event.target.currentPassword.value,
      newPassword: event.target.newPassword.value,
      notificationPreference: notificationPreference
    });
  };

  return (
    <Container className="settings-page">
                  <FontAwesomeIcon
                icon={faArrowLeft}
                className="back-button"
                onClick={() => window.history.back()}
            />
      <Form className="settings-form" onSubmit={handleSubmit}>
      <h2 className="settings-header">Reset Password & Preferences</h2>

        <Row className="mb-4">
          <Col md={12}>
            <Form.Group controlId="formCurrentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control type="password" name="currentPassword" placeholder="Enter your current password" required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={12}>
            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" name="newPassword" placeholder="Enter a new password" required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={12}>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="password" name="confirmPassword" placeholder="Confirm your new password" required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={12}>
            <Form.Group controlId="formNotification">
              <Form.Label>Notification Preference</Form.Label>
              <div className="notification-options">
                <Form.Check
                  type="radio"
                  label="Email"
                  value="email"
                  name="notificationPreference"
                  checked={notificationPreference === 'email'}
                  onChange={handlePreferenceChange}
                />
                <Form.Check
                  type="radio"
                  label="SMS"
                  value="sms"
                  name="notificationPreference"
                  checked={notificationPreference === 'sms'}
                  onChange={handlePreferenceChange}
                />
                <Form.Check
                  type="radio"
                  label="Both"
                  value="both"
                  name="notificationPreference"
                  checked={notificationPreference === 'both'}
                  onChange={handlePreferenceChange}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className='settings-submit-button'>
          Save Settings
        </Button>
      </Form>
    </Container>
  );
};

export default Settings;
