import { Box, CircularProgress } from '@mui/material';
import React from 'react';

type LoaderProps = {
  children: React.ReactElement;
  isLoading: boolean;
};

export default function Loader({ children, isLoading }: LoaderProps): JSX.Element {
  if (isLoading)
    return (
      <>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#04fc57" />
              <stop offset="50%" stopColor="#0fcddb" />
              <stop offset="100%" stopColor="#1d9de7" />
            </linearGradient>
          </defs>
        </svg>
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress
            size={60} // Устанавливаем размер кругового индикатора
            thickness={5} // Устанавливаем толщину кругового индикатора
            sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
          />
        </Box>
      </>
    );
  return children;
}
