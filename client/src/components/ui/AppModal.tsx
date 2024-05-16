import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Stack } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleModal } from '../../redux/slices/spots/spotsSlice';
import type { UserType } from '../../types/userTypes';
import tgIcon from '../../../public/icons8-telegram-50.png';
import waIcon from '../../../public/icons8-whatsapp-50.png';

export default function AppModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const show = useAppSelector((store) => store.spots.isModalOpen);
  const users = useAppSelector((store) => store.messages.users);
  const usersFlat = users.flat();

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const handleModalClose = (): void => {
    setSelectedUser(null); // Сбросить выбранного пользователя при закрытии модального окна
    dispatch(toggleModal(false));
  };

  const handleUserClick = (user: UserType | null): void => {
    setSelectedUser((prevUser) => (prevUser && user && prevUser.id === user.id ? null : user));
  };

  const convertPhoneNumber = (phoneNumber: string): null | string => {
    // Удаляем все символы, кроме цифр
    const cleaned: string = phoneNumber.replace(/\D/g, '');

    // Если длина номера меньше 10, вероятно, что это не полный номер
    if (cleaned.length < 10) {
      return null;
    }

    // Форматируем номер в нужный формат
    const formatted = `+${cleaned.slice(0, 1)}${cleaned.slice(1, 4)}${cleaned.slice(4, 7)}${cleaned.slice(7)}`;
    return formatted;
  };
  const handleTelegramClick = (): void => {
    if (selectedUser) window.open(`https://t.me/${convertPhoneNumber(selectedUser.tel)}`, '_blank');
  };
  const handleWA = (): void => {
    if (selectedUser)
      window.open(`https://wa.me/${convertPhoneNumber(selectedUser.tel)}`, '_blank');
  };
  return (
    <Modal show={show} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedUser ? 'Профиль пользователя' : 'Пользователи онлайн'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedUser ? (
          <div className="text-center py-5" onClick={() => setSelectedUser(null)}>
            <img
              src={selectedUser.img}
              alt="User Avatar"
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '20px',
                marginTop: '-20px',
              }}
              className="rounded-circle"
            />
            <div style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '10px' }}>
              {selectedUser.username}
            </div>
            <div
              style={{
                borderBottom: '1px solid rgba(128, 128, 128, 0.2)',
                width: '70%',
                marginBottom: '10px',
                margin: 'auto',
              }}
            />
            <div
              style={{
                fontSize: '20px',
                textAlign: 'left',
                marginTop: '30px',
                marginLeft: '70px',
                marginBottom: '10px',
              }}
            >{`Email: ${selectedUser.email}`}</div>
            <div
              style={{ fontSize: '20px', textAlign: 'left', marginLeft: '70px' }}
            >{`Телефон: ${selectedUser.tel}`}</div>
            <div style={{ marginTop: '10px' }}>
              <img
                src={tgIcon}
                alt=""
                onClick={handleTelegramClick}
                style={{ marginLeft: '10px' }}
              />
              <img src={waIcon} alt="" onClick={handleWA} />
            </div>
            <div style={{ marginTop: '10px' }} />
          </div>
        ) : (
          <Stack>
            {usersFlat.map((user) => (
              <div
                className="p-2 d-flex align-items-center"
                key={user.id}
                onClick={() => handleUserClick(user)}
              >
                <img
                  src={user.img}
                  alt="User Avatar"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                  className="rounded-circle"
                />
                <div style={{ marginLeft: '10px', fontSize: '20px' }}>{user.username}</div>
              </div>
            ))}
          </Stack>
        )}
      </Modal.Body>
    </Modal>
  );
}
