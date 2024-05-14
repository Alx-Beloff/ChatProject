import React from 'react';
import QRCode from 'react-qr-code';

function QrCodePage(): JSX.Element {
  const randomNumber = Math.floor(Math.random() * 50);
  const link = `chat/2=${randomNumber}`;

  return (
    <div className="qr-code-container">
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
  );
}

export default QrCodePage;
