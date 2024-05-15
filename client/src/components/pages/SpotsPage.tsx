import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSpotsThunk } from '../../redux/slices/spots/spotsThunks';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import OneSpotCard from '../ui/OneSpotCard';
import BackIcon from '../../../public/icons8-back-50 black.png';

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
        <img src={BackIcon} alt="Back Icon" width="30" height="30" />
      </button>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: '25px',
            fontWeight: 'bold',
            marginTop: '-10px',
            marginBottom: '30px',
          }}
        >
          Подключенные заведения
        </div>

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
