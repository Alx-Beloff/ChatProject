import React from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './components/ui/Root';
import ChatPage from './components/pages/ChatPage';
import MainPage from './components/pages/MainPage';
import ProfilePage from './components/pages/ProfilePage';
import SpotsPage from './components/pages/SpotsPage';

function App(): JSX.Element {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/profile',
          element: <ProfilePage />,
        },
        {
          path: '/spots',
          element: <SpotsPage />,
        },
        {
          path: '/chat',
          element: <ChatPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
