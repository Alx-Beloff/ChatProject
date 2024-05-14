import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Stack } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleModal } from '../../redux/slices/spots/spotsSlice';

export default function AppModal({ title }): JSX.Element {
  const dispatch = useAppDispatch();
  const show = useAppSelector((store) => store.spots.isModalOpen);
  const users = useAppSelector((store) => store.messages.users);
  const usersFlat = users.flat();

  const [selectedUser, setSelectedUser] = useState(null);

  const handleModalClose = () => {
    setSelectedUser(null); // Сбросить выбранного пользователя при закрытии модального окна
    dispatch(toggleModal(false));
  };

  const handleUserClick = (user) => {
    setSelectedUser((prevUser) => (prevUser && prevUser.id === user.id ? null : user));
  };
  return (
    <Modal show={show} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedUser ? 'Страница пользователя' : 'Пользователи онлайн'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedUser ? (
          <div className="text-center py-5" onClick={() => setSelectedUser(null)}>
            <img
              src={selectedUser.img}
              alt="User Avatar"
              style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover' }}
              className="rounded-circle"
            />
            <div style={{ fontSize: '40px', fontWeight: 'bold' }}>{selectedUser.username}</div>
            <div>{selectedUser.email}</div>
            <div>{selectedUser.tel}</div>
          </div>
        ) : (
          <Stack>
            {usersFlat.map((user) => (
              <div className="p-2" key={user.id} onClick={() => handleUserClick(user)}>
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
                {user.username}
              </div>
            ))}
          </Stack>
        )}
      </Modal.Body>
    </Modal>
  );
}
