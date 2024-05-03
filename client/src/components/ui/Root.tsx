import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Root(): JSX.Element {
  return (
    <div>
      <Outlet />
    </div>
  );
}
