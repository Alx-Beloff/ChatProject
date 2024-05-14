import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { getSpotsThunk } from '../../redux/slices/spots/spotsThunks';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import OneSpotCard from '../ui/OneSpotCard';

export default function SpotsPage(): JSX.Element {
  const spots = useAppSelector((store) => store.spots.spots);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    void dispatch(getSpotsThunk());
  }, []);

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
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#000',
            fontFamily: 'Kanit',
            textShadow: '2px 2px 4px rgba(128,128,128,0.5)',
          }}
        >
          All Spots
        </h1>
        <Box display="flex" flexDirection="column" alignItems="center">
          {spots.map((spot) => (
            <Box mb={2} key={spot.id}>
              <OneSpotCard spot={spot} />
            </Box>
          ))}
        </Box>
      </div>
    </div>
  );
}
