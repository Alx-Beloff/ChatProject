import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsCamera, BsPerson, BsBuilding } from 'react-icons/bs'; // импортируем иконки
import { useNavigate } from 'react-router-dom';

export default function MainPage(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div
      className="mainPage-container"
      style={{
        // backgroundImage:
        //   "url('https://w0.peakpx.com/wallpaper/215/383/HD-wallpaper-minimalistic-colours-minimal-colours-pattern-stock.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Container>
        <Row className="justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
          <Col xs={12} className="text-center">
            <h1
              className="mainPage-h1"
              style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#000',
                fontFamily: 'Kanit',
                textShadow: '2px 2px 4px rgba(128,128,128,0.5)',
              }}
            >
              Green Iguana SpotChat
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={4} className="text-center mb-3">
            <button type="button" className="page-button">
              <BsCamera style={{ marginRight: '5px', marginBottom: '5px' }} /> Scan QR
            </button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={4} className="text-center mb-3">
            <button type="button" className="page-button" onClick={() => navigate('/profile')}>
              <BsPerson style={{ marginRight: '5px', marginBottom: '5px' }} /> Личный кабинет
            </button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={4} className="text-center mb-3">
            <button type="button" className="page-button" onClick={() => navigate('/spots')}>
              <BsBuilding style={{ marginRight: '5px', marginBottom: '5px' }} /> Все заведения
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
