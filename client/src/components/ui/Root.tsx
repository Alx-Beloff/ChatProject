import React from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../hocks/Loader';
import { useAppSelector } from '../../redux/hooks';
import ErrorSnackbar from './ErrorSnackbar';

export default function Root(): JSX.Element {
  const user = useAppSelector((store) => store.auth.user);

  return (
    <Loader isLoading={user.status === 'pending'}>
      <>
        <Outlet />
        <ErrorSnackbar />
      </>
    </Loader>
  );
}
