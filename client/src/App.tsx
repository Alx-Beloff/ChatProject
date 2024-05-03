import React, { useEffect } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './components/ui/Root';
import ChatPage from './components/pages/ChatPage';
import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';
import { useAppDispatch } from './redux/hooks';
import { checkUserThunk } from './redux/slices/auth/authThunks';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(checkUserThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element: <Navigate to="/" />,
        },
        {
          path: '/mainPage',
          element: <MainPage />,
        },
        {
          path: '/chat',
          element: <ChatPage />,
        },
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
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
