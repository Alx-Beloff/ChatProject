import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { BsCamera, BsPerson, BsBuilding } from 'react-icons/bs'; // импортируем иконки

export default function MainPage(): JSX.Element {
  return (
    <div
      className="mainPage-container"
      style={{
        backgroundImage:
          "url('https://w0.peakpx.com/wallpaper/215/383/HD-wallpaper-minimalistic-colours-minimal-colours-pattern-stock.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Container>
        <Row className="justify-content-center align-items-center" style={{ height: '50vh' }}>
          <Col xs={12} className="text-center">
            <h1
              className="mainPage-h1"
              style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#fff',
                fontFamily: 'Kanit',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              Green Iguana Chat
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={4} className="text-center mb-3">
            <Button variant="info" size="lg">
              <BsCamera style={{ marginRight: '5px', marginBottom: '5px' }} /> Scan QR
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={4} className="text-center mb-3">
            <Button variant="info" size="lg">
              <BsPerson style={{ marginRight: '5px', marginBottom: '5px' }} /> Личный кабинет
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={4} className="text-center mb-3">
            <Button variant="info" size="lg">
              <BsBuilding style={{ marginRight: '5px', marginBottom: '5px' }} /> Все заведения
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
