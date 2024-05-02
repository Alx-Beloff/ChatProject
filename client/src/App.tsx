import React from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './components/ui/Root';
import ChatPage from './components/pages/ChatPage';
import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';

function App(): JSX.Element {
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
