import './index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';

import App from './App';
import { constants } from './constants';
import { DetailsPage } from './pages/Details/Details';
import { DiscoverPage } from './pages/Discover/Discover';
import { HomePage } from './pages/Home/Home';
import { LoginPage } from './pages/Login/Login';
import { NotFoundPage } from './pages/NotFound/NotFound';
import { RegisterPage } from './pages/Register/Register';
import { setIsAuthenticated } from './redux/reducers/authentication';
import { store } from './redux/store';
import { validateToken } from './tools';

const guard = (path) => {
  const validToken = validateToken();

  store.dispatch(setIsAuthenticated(validToken));

  if (constants.protectedRoutes.includes(path)) {
    return validToken ? null : redirect('/login');
  }

  if (validToken && (path === 'login' || path === 'register')) {
    return redirect('/discover');
  }

  return null;
};

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <DetailsPage />,
        loader: () => guard('details'),
        path: '/details/:movieId',
      },
      {
        element: <DiscoverPage />,
        loader: () => guard('discover'),
        path: '/discover',
      },
      {
        element: <HomePage />,
        loader: () => guard('home'),
        path: '/',
      },
      {
        element: <LoginPage />,
        loader: () => guard('login'),
        path: '/login',
      },
      {
        element: <NotFoundPage />,
        loader: () => guard(''),
        path: '*',
      },
      {
        element: <RegisterPage />,
        loader: () => guard('register'),
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

library.add(far, fas);
