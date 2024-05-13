import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsCamera, BsPerson, BsBuilding } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';

export default function MainPage(): JSX.Element {
  const navigate = useNavigate();

  const [isEnabled, setEnabled] = useState(false);
  const [qrLink, setQrLink] = useState('');

  useEffect(() => {
    const config = { fps: 10, qrbox: { width: 200, height: 200 } };
    const html5QrCode = new Html5Qrcode('qrCodeContainer');

    const qrScannerStop = () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode
          .stop()
          .then(() => console.log('Scanner Stopped'))
          .catch(() => console.log('Scanner error'));
      }
    };

    const qrCodeSuccess = (decodedText) => {
      console.log(decodedText);
      navigate('/chat');
      setEnabled(false);
    };

    if (isEnabled) {
      void html5QrCode.start({ facingMode: 'environment' }, config, qrCodeSuccess);
      setQrLink('');
    } else {
      qrScannerStop();
    }

    return () => {
      qrScannerStop();
    };
  }, [isEnabled, navigate]);
  return (
    <div
      className="mainPage-container"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Container>
        <Row className="justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
          <Col xs={12} className="text-center">
            <img src="../../../public/SpotChatLogo.png" alt="logo" width="160" height="160" />
            <h1
              className="mainPage-h1"
              style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#000',
                fontFamily: 'Kanit',
                textShadow: '2px 2px 4px rgba(128,128,128,0.5)',
                marginBottom: '150px',
              }}
            >
              SpotChat
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <div className="scanner">
            <div id="qrCodeContainer"></div>
          </div>
        </Row>
        <div className="mainPageButtons">
          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} className="text-center mb-3">
              {qrLink && <div className="qr-link">{qrLink}</div>}
              <button type="button" onClick={() => setEnabled(!isEnabled)} className="page-button">
                <BsCamera style={{ marginRight: '5px', marginBottom: '5px' }} /> Scan QR
              </button>
            </Col>
            <Col xs={12} sm={6} md={4} className="text-center mb-3">
              <button type="button" className="page-button" onClick={() => navigate('/profile')}>
                <BsPerson style={{ marginRight: '5px', marginBottom: '5px' }} /> Личный кабинет
              </button>
            </Col>
            <Col xs={12} sm={6} md={4} className="text-center mb-3">
              <button type="button" className="page-button" onClick={() => navigate('/spots')}>
                <BsBuilding style={{ marginRight: '5px', marginBottom: '5px' }} /> Все заведения
              </button>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
