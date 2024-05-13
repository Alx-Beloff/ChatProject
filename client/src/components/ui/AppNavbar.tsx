import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import BackIcon from '../../../public/icons8-back-50.png';
import DotsIcon from '../../../public/icons8-dots-50.png';

export default function AppNavbar(): JSX.Element {
  const navigate = useNavigate();
  const { spotId } = useParams();
  
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Nav className="justify-content-between" style={{ width: '100%' }}>
          <Nav.Link
            onClick={() => {
              navigate('/');
            }}
          >
            <img src={BackIcon} alt="Back Icon" width="20" height="20" />{' '}
          </Nav.Link>
          <Nav.Link href="#features" className="d-flex justify-content-center flex-grow-1">
            Features
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              navigate('/');
            }}
            style={{ marginLeft: 'auto' }}
          >
            <img src={DotsIcon} alt="Dots Icon" width="20" height="20" />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
