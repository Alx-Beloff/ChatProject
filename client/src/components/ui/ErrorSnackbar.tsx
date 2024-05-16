import { Snackbar } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setError } from '../../redux/slices/auth/authSlice';

export default function ErrorSnackbar(): JSX.Element {
  const dispatch = useAppDispatch();
  const error = useAppSelector((store) => store.auth.error);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={!!error}
      onClose={() => dispatch(setError(''))}
      message={error}
    />
  );
}
