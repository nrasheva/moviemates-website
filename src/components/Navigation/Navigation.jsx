import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './Navigation.module.css';
import { setIsAuthenticated } from '../../redux/reducers/authentication';

const MENU_ITEMS = { protected: ['home', 'profile'], public: ['home', 'login', 'register'] };

export const Navigation = () => {
  const [visible, setVisible] = useState(false);

  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);

  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { matches: isDesktop } = window.matchMedia('(min-width: 1200px)');

    // Handle scrolling
    if (isDesktop) {
      document.body.style.overflow = 'visible';
    } else if (visible) {
      document.body.style.overflow = 'hidden';
    }
  }, [visible]);

  const handleNavigation = () => {
    // Disable scrolling when the navigation is visible on mobile
    document.body.style.overflow = visible ? 'visible' : 'hidden';

    setVisible(!visible);
  };

  const handleLink = (url) => {
    if (`/${url}` !== location.pathname) {
      navigate(`/${url === 'home' ? '' : url}`);

      handleNavigation();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');

    dispatch(setIsAuthenticated(false));

    navigate('/login');
  };

  return (
    <nav>
      <span className={styles['nav-logo']} onClick={() => navigate('/')}>
        moviemates
      </span>
      <div className={styles['nav-content']}>
        <div className={`${styles['nav-items']} ${visible ? '' : styles.hidden}`}>
          {MENU_ITEMS[isAuthenticated ? 'protected' : 'public'].map((menuItem) => {
            return (
              <span key={menuItem} onClick={() => handleLink(menuItem)}>
                {menuItem.charAt(0).toUpperCase() + menuItem.slice(1)}
              </span>
            );
          })}
          {isAuthenticated && (
            <span onClick={handleLogout}>
              <FontAwesomeIcon icon='fa-solid fa-right-from-bracket' />
            </span>
          )}
        </div>
        <div className={`${styles['hamburger-menu']} ${visible ? styles.visible : ''}`} onClick={handleNavigation}>
          <div className={styles.bar} />
          <div className={styles.bar} />
          <div className={styles.bar} />
        </div>
      </div>
    </nav>
  );
};
