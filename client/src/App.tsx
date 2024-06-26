import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkUserThunk } from './redux/slices/auth/authThunks';
import Root from './components/ui/Root';
import PrivateRouter from './components/hocks/PrivateRouter';
import ChatPage from './components/pages/ChatPage';
import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';
import ErrorPage from './components/pages/ErrorPage';
import ProfilePage from './components/pages/ProfilePage';
import SpotsPage from './components/pages/SpotsPage';
import QrCodePage from './components/pages/QrCodePage';
import AdminPage from './components/pages/AdminPage';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.user);

  useEffect(() => {
    void dispatch(checkUserThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <PrivateRouter isAllowed={user.status === 'logged'} redirect="/login" />,
          children: [
            {
              path: '/',
              element: <MainPage />,
            },
            {
              path: '/chat/:spotId',
              element: <ChatPage />,
            },
            {
              path: '/profile',
              element: <ProfilePage />,
            },
            {
              path: '/spots',
              element: <SpotsPage />,
            },
          ],
        },

        {
          element: <PrivateRouter isAllowed={user.status === 'logged' && user.role === 'admin'} />,
          children: [
            {
              path: '/qr/:spotId',
              element: <QrCodePage />,
            },
            {
              path: '/adminPage',
              element: <AdminPage />,
            },
          ],
        },

        {
          element: <PrivateRouter isAllowed={user.status === 'guest'} />,
          children: [
            {
              path: '/login',
              element: <LoginPage />,
            },
            {
              path: '/signup',
              element: <LoginPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
