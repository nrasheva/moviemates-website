import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import { CommentsPage } from './pages/Comments';
import { DiscoverPage } from './pages/Discover';
import { HomePage } from './pages/Home/Home';
import { LoginPage } from './pages/Login/Login';
import { NotFoundPage } from './pages/NotFound/NotFound';
import { RegisterPage } from './pages/Register';

const router = createBrowserRouter([
  {
    children: [
      {
        element: <CommentsPage />,
        path: '/comments/:movieId',
      },
      {
        element: <DiscoverPage />,
        path: '/discover',
      },
      {
        element: <HomePage />,
        path: '/',
      },
      {
        element: <LoginPage />,
        path: '/login',
      },
      {
        element: <NotFoundPage />,
        path: '*',
      },
      {
        element: <RegisterPage />,
        path: '/register',
      },
    ],
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
