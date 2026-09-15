import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function ProfilePage({ user }) {
  return (
    <Container className="profile-container py-5">
      <Row>
        <Col md={8} className="mx-auto">
          <h1>User Profile</h1>
          <p>Profile page is being developed...</p>
          {user && (
            <div>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
