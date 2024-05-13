import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { BsArrowLeft } from 'react-icons/bs'; // импортируем иконку стрелочки
import { useNavigate } from 'react-router-dom';

export default function ProfilePage(): JSX.Element {
  const arr = ['Хрючево', 'KFC', "McDonald's", 'Burger King', 'Столовка вонючая'];
  const navigate = useNavigate();

  return (
    <div className="profile-page">
      <div>
        <button type="button" className="back-button" onClick={() => navigate('/')}>
          <span className="visually-hidden">Назад</span>
          <BsArrowLeft />
        </button>
      </div>
      <Container className="text-center">
        <Row className="justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
          <Col className="text-center mb-3">
            <Image
              className="profile-image"
              src="https://i.pinimg.com/originals/a8/4e/ca/a84eca7b65b0afcc6c17ffcaa2b23ee4.jpg"
              roundedCircle
            />
          </Col>
          <Row className="justify-content-center">
            <Col sm={6} md={4} className="text-center mb-3">
              <h1 className="profile-name">Лох без друзей</h1>
              <p className="profile-p">Посещенные места:</p>
            </Col>
          </Row>
        </Row>
        {arr.map((item) => (
          <Row className="justify-content-center">
            <Col sm={6} md={4} className="text-center mb-3">
              <h1 className="page-button" style={{ width: 'fit-content', margin: 'auto' }}>
                {item}
              </h1>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
}
