import './index.css';

import App from './App.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CommentsPage } from './pages/Comments.jsx';
import { DiscoverPage } from './pages/Discover';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { NotFoundPage } from './pages/NotFoundPage/NotFound.jsx';
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
  </React.StrictMode>
);
