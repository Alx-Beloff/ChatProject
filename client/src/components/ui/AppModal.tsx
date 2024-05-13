import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function AppModal({ title, show, handleClose, children }): JSX.Element {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Посетители онлайн</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
