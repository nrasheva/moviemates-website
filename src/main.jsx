import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import { DiscoverPage } from './pages/Discover';
import { HomePage } from './pages/Home';
import React from 'react';
import ReactDOM from 'react-dom/client';

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
    ],
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
