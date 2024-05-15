import React, { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutThunk } from '../../redux/slices/auth/authThunks';
import { getMessagesThunk, getSpotsThunk } from '../../redux/slices/spots/spotsThunks';
import BackIcon from '../../../public/icons8-back-50 black.png';

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
          <img src={BackIcon} alt="Back Icon" width="30" height="30" />
        </button>
      </div>
      <Container className="text-center">
        <Row className="justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
          <Col className="text-center mb-3">
            {user.status === 'logged' && (
              <Image
                className="profile-image"
                src={user.img}
                style={{
                  borderColor: 'transparent',
                  borderRadius: '50%',
                  width: '200px',
                  height: '200px',
                }}
              />
            )}
          </Col>

          <Row className="justify-content-center">
            <Col sm={6} md={4} className="text-center mb-3">
              {user.status === 'logged' && (
                <div style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '10px' }}>
                  {user.username}
                </div>
              )}
              <div
                style={{
                  borderBottom: '1px solid rgba(128, 128, 128, 0.2)',
                  width: '100%',
                  marginBottom: '10px',
                  margin: 'auto',
                }}
              />
              <p
                style={{
                  fontSize: '20px',
                  marginTop: '20px',
                }}
              >
                Посещенные места:
              </p>
            </Col>
          </Row>
        </Row>
        {newSpots.map((item) => (
          <Row className="justify-content-center" key={item.id}>
            <Col sm={6} md={4} className="text-center mb-3">
              <div className="card rounded-3" style={{ borderColor: 'transparent' }}>
                <img
                  src={item.img}
                  className="card-img-top"
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px',
                  }}
                />
                <div
                  className="card-body"
                  style={{
                    backgroundColor: '#313131',
                    borderBottomLeftRadius: '20px',
                    borderBottomRightRadius: '20px',
                  }}
                >
                  <h5 className="card-title" style={{ color: 'white' }}>
                    {item.name}
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        ))}
        <Button
          className="btn btn-danger"
          onClick={() => void dispatch(logoutThunk())}
          style={{ height: '50px', fontSize: '20px', width: '270px', borderRadius: '25px' }}
        >
          Выход
        </Button>
      </Container>
    </div>
  );
}
