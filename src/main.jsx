import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import { CommentsrPage } from './pages/Comments.jsx';
import { DiscoverPage } from './pages/Discover';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { NotFoundPage } from './pages/NotFoundPage/NotFound.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RegisterPage } from './pages/Register';

const router = createBrowserRouter([
  {
    children: [
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
        element: <RegisterPage />,
        path: '/register',
      },
      {
        element: <CommentsrPage />,
        path: '/comments/:movieId',
      },
      {
        element: <NotFoundPage />,
        path: '*',
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
