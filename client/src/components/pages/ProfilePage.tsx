import React, { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs'; // импортируем иконку стрелочки
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutThunk } from '../../redux/slices/auth/authThunks';
import { getMessagesThunk, getSpotsThunk } from '../../redux/slices/spots/spotsThunks';

export default function ProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();

  const spotsId = useAppSelector((store) => store.spots.filtredSpots);
  const spots = useAppSelector((store) => store.spots.spots);

  const newSpots = [];
  for (let i = 0; i < spotsId.length; i += 1) {
    newSpots.push(...spots.filter((el) => el.id === spotsId[i]));
  }

  useEffect(() => {
    void dispatch(getMessagesThunk());
    void dispatch(getSpotsThunk());
  }, []);

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
            {user.status === 'logged' && (
              <Image className="profile-image" src={user.img} roundedCircle />
            )}
          </Col>
          <Row className="justify-content-center">
            <Col sm={6} md={4} className="text-center mb-3">
              {user.status === 'logged' && <h1 className="profile-name">{user.username}</h1>}
              <p className="profile-p">Посещенные места:</p>
            </Col>
          </Row>
        </Row>
        {newSpots.map((item) => (
          <Row className="justify-content-center" key={item.id}>
            <Col sm={6} md={4} className="text-center mb-3">
              <div className="card">
                <img
                  src={item.img}
                  className="card-img-top"
                  alt={item.name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                </div>
              </div>
            </Col>
          </Row>
        ))}
        <Button className="btn btn-danger" onClick={() => void dispatch(logoutThunk())}>
          Quit
        </Button>
      </Container>
    </div>
  );
}
