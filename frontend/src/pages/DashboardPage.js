import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../styles/Dashboard.css';

function DashboardPage({ user }) {
  return (
    <Container className="dashboard-container py-5">
      <Row className="mb-4">
        <Col>
          <h1>Welcome, {user?.username}!</h1>
          <p className="text-muted">Find your perfect match today</p>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body className="text-center">
              <h5>Discover Matches</h5>
              <p>Browse profiles and find your perfect match</p>
              <Button href="/matches" variant="primary">View Matches</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body className="text-center">
              <h5>Your Profile</h5>
              <p>Complete and customize your profile</p>
              <Button href="/profile" variant="primary">Edit Profile</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body className="text-center">
              <h5>Messages</h5>
              <p>Chat with your matches in real-time</p>
              <Button href="/chat" variant="primary">Open Chat</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body className="text-center">
              <h5>Private Room</h5>
              <p>Decorate and personalize your private room</p>
              <Button variant="primary" disabled>Coming Soon</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardPage;
