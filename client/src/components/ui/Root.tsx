import React from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../hocks/Loader';
import { useAppSelector } from '../../redux/hooks';

export default function Root(): JSX.Element {
  const user = useAppSelector((store) => store.auth.user);

  return (
    <Loader isLoading={user.status === 'pending'}>
      {/* <div style={{background: 'linear-gradient(330deg,rgba(182, 164, 243, 0.5), rgba(43, 204, 245, 0.5) )'}}> */}
        <Outlet />
      {/* </div> */}
    </Loader>
  );
}
