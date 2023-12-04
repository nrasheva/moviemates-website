import { jwtDecode } from 'jwt-decode';

import { setLoading, setModal } from '../redux/reducers/shared';
import { setWatchlist } from '../redux/reducers/watchlist';
import { store } from '../redux/store';
import { getWatchlist } from '../services/watchlist.service';

export const decodeToken = () => {
  const token = localStorage.getItem('token');

  return token ? jwtDecode(token) : null;
};

export const formatDate = (date) => {
  const options = { day: '2-digit', month: 'long', year: 'numeric' };

  return new Date(date).toLocaleDateString('en-GB', options);
};

export const formatTimestamp = (timestamp) => {
  const options = {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: 'long',
    year: 'numeric',
  };

  return new Date(timestamp * 1000).toLocaleDateString('en-GB', options);
};

export const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }

  store.dispatch(setLoading(false));
  store.dispatch(
    setModal({
      text: 'An error occurred, please try again later',
      visible: true,
    }),
  );
};

export const handleWatchlist = async () => {
  try {
    const { watchlist } = await getWatchlist();

    store.dispatch(setLoading(false));
    store.dispatch(setWatchlist(watchlist));
  } catch (error) {
    console.log(error);
  }
};

// Validates authentication credentials
export const validateCredentials = (email, password) => {
  const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const validPassword = password.length >= 8;

  if (!validEmail && !validPassword) {
    return 'Enter a valid email and password of at least 8 characters';
  }

  if (!validEmail) {
    return 'Enter a valid email';
  }

  if (!validPassword) {
    return 'Your password must have at least 8 characters';
  }

  return '';
};

export const validateJSON = (string) => {
  try {
    JSON.parse(string);
  } catch {
    return false;
  }

  return JSON.parse(string);
};

export const validateToken = () => {
  const decodedToken = decodeToken();

  if (decodedToken) {
    const now = Math.floor(new Date().getTime() / 1000.0);
    return decodedToken.exp > now;
  } else {
    return false;
  }
};
