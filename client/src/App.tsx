import React from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './components/ui/Root';
import ChatPage from './components/pages/ChatPage';

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
          path: '/chat',
          element: <ChatPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
