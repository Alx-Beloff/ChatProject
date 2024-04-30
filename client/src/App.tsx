import React from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './components/ui/Root';
import ChatPage from './components/pages/ChatPage';
import MainPage from './components/pages/MainPage';

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
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
