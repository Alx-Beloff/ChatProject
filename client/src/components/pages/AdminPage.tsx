import { useNavigate } from 'react-router-dom';
import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import AddSpotForm from '../ui/AddSpotForm';

export default function AdminPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div>
      <button
        style={{ padding: '20px' }}
        type="button"
        className="back-button"
        onClick={() => navigate('/')}
      >
        <span className="visually-hidden">Назад</span>
        <BsArrowLeft />
      </button>
      <AddSpotForm />
    </div>
  );
}
