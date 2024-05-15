import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BsCamera, BsPerson, BsBuilding } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import { useAppSelector } from '../../redux/hooks';
import qrImage from '../../../public/qrImg.png';

export default function MainPage(): JSX.Element {
  const navigate = useNavigate();
  const user = useAppSelector((store) => store.auth.user);

  const [isEnabled, setEnabled] = useState(false);
  const [qrLink, setQrLink] = useState('');

  useEffect(() => {
    const config = { fps: 10, qrbox: { width: 200, height: 200 } };
    const html5QrCode = new Html5Qrcode('qrCodeContainer');

    const qrScannerStop = (): void => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode
          .stop()
          .then(() => console.log('Scanner Stopped'))
          .catch(() => console.log('Scanner error'));
      }
    };

    const qrCodeSuccess = (decodedText: string): void => {
      const equalSignIndex = decodedText.indexOf('=');
      const link = decodedText.substring(0, equalSignIndex);
      navigate(`/${link}`);
      setEnabled(false);
    };

    if (isEnabled) {
      void html5QrCode.start({ facingMode: 'environment' }, config, qrCodeSuccess, (error) =>
        console.error('QR Code error:', error),
      );
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
        backgroundColor: '#fcfcfc',
      }}
    >
      <Container>
        <Row className="justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
          <Col xs={12} className="text-center">
            <img src="../../../public/SpotChatLogo.png" alt="logo" width="200" height="200" />
            <h1
              className="mainPage-h1"
              style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#313131',

                marginTop: '15px',
                marginBottom: '150px',
              }}
            >
              SpotChat
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <div className="scanner">
            <img
              src={qrImage}
              alt=""
              width="200"
              height="200"
              style={{ position: 'absolute', opacity: '5%' }}
            />
            <div id="qrCodeContainer" />
          </div>
        </Row>
        <div className="mainPageButtons">
          <Col xs={12} sm={3} md={4} className="text-center mb-4">
            {user.status === 'logged' && user.role === 'admin' && (
              <Button
                type="button"
                style={{
                  backgroundColor: '#313131',
                  color: 'white',
                  height: '50px',
                  fontSize: '20px',
                  width: '270px',
                  borderColor: 'transparent',
                  borderRadius: '25px',
                }}
                onClick={() => navigate('/adminPage')}
              >
                Админка
              </Button>
            )}
          </Col>
          <Col xs={12} sm={6} md={4} className="text-center mb-4">
            {qrLink && <div className="qr-link">{qrLink}</div>}
            <Button
              type="button"
              onClick={() => setEnabled(!isEnabled)}
              style={{
                backgroundColor: '#313131',
                color: 'white',
                height: '50px',
                fontSize: '20px',
                width: '270px',
                borderColor: 'transparent',
                borderRadius: '25px',
              }}
            >
              <BsCamera style={{ marginRight: '5px', marginBottom: '5px' }} /> Scan QR
            </Button>
          </Col>
          <Col xs={12} sm={6} md={4} className="text-center mb-4">
            <Button
              type="button"
              style={{
                backgroundColor: '#7573f0',
                color: 'white',
                height: '50px',
                fontSize: '20px',
                width: '270px',
                borderRadius: '25px',
              }}
              onClick={() => navigate('/profile')}
            >
              <BsPerson style={{ marginRight: '5px', marginBottom: '5px' }} /> Личный кабинет
            </Button>
          </Col>
          <Col xs={12} sm={6} md={4} className="text-center mb-3">
            <Button
              type="button"
              style={{
                backgroundColor: '#7573f0',
                color: 'white',
                height: '50px',
                fontSize: '20px',
                width: '270px',
                borderRadius: '25px',
              }}
              onClick={() => navigate('/spots')}
            >
              <BsBuilding style={{ marginRight: '5px', marginBottom: '5px' }} /> Все заведения
            </Button>
          </Col>
        </div>
      </Container>
    </div>
  );
}
