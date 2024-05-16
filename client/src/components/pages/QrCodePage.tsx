import React from 'react';
import QRCode from 'react-qr-code';
import { useNavigate, useParams } from 'react-router-dom';
import BackIcon from '../../../public/icons8-back-50 black.png';

function QrCodePage(): JSX.Element {
  const randomNumber = Math.floor(Math.random() * 1000000);
  const { spotId } = useParams();
  const link = `chat/${spotId}=${randomNumber}`;
  const navigate = useNavigate();
  return (
    <div className="profile-page">
      <div>
        <button type="button" className="back-button" onClick={() => navigate('/spots')}>
          <img src={BackIcon} alt="Back Icon" width="30" height="30" />
        </button>
      </div>
      <div className="qr-code-container" style={{ height: '90vh' }}>
        {' '}
        {/* Обертка для центрирования */}
        <QRCode
          value={link}
          size={400} // Увеличиваем размер QR-кода
          level="H" // Устанавливаем высокий уровень коррекции ошибок
          bgColor="#ffffff" // Цвет фона QR-кода
          fgColor="#000000" // Цвет самого QR-кода
        />
      </div>
    </div>
  );
}
export default QrCodePage;
