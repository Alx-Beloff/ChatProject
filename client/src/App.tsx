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
              path: '/chat',
              element: <ChatPage />,
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
