import styles from './Navigation.module.css';

import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/discover'>Discover</Link>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
    </nav>
  );
};
