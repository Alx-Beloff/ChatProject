import React, { useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import BackIcon from '../../../public/icons8-back-50.png';
import DotsIcon from '../../../public/icons8-dots-50.png';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getSpotsThunk } from '../../redux/slices/spots/spotsThunks';
import { toggleModal } from '../../redux/slices/spots/spotsSlice';

export default function AppNavbar(): JSX.Element {
  const { spotId } = useParams();
  const dispatch = useAppDispatch();
  const spots = useAppSelector((store) => store.spots.spots);
  const spot = spots.find((el) => el.id === Number(spotId));
  const users = useAppSelector((store) => store.messages.users);
  const usersCount = users.flat().length;
  const splitSpotName = spot?.name.split(`"`)[1];

  useEffect(() => {
    void dispatch(getSpotsThunk());
  }, []);
  const navigate = useNavigate();

  return (
    <Navbar data-bs-theme="dark" style={{ backgroundColor: '#313131', height: '75px' }}>
      <Container>
        <Nav className="justify-content-between" style={{ position: 'relative', width: '100%' }}>
          <Nav.Link
            onClick={() => {
              navigate('/');
            }}
          >
            <img src={BackIcon} alt="Back Icon" width="30" height="30" />{' '}
          </Nav.Link>
          <Nav.Link
            className="d-flex justify-content-center flex-grow-1"
            style={{
              color: 'white',
              fontSize: '25px',
              fontWeight: '20px',
              position: 'relative',
              top: '-10px',
            }}
          >
            {splitSpotName}
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              dispatch(toggleModal(true));
            }}
            style={{ marginLeft: 'auto' }}
          >
            <img src={DotsIcon} alt="Dots Icon" width="30" height="30" />
          </Nav.Link>
          <div
            style={{
              position: 'absolute',
              right: '50%',
              transform: 'translateX(50%)',
              top: '30px',
            }}
          >
            <span style={{ fontSize: '12px', color: '#c3c3c3' }}>{`Онлайн: ${usersCount}`}</span>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}
