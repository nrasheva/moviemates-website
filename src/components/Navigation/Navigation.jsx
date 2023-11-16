import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Navigation.module.css';
import { setIsAuthenticated } from '../../redux/reducers/authentication';

const MENU_ITEMS = { protected: ['profile'], public: ['home', 'login', 'register'] };

export const Navigation = () => {
  const [height, setHeight] = useState(0);
  const [visible, setVisible] = useState(false);

  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useLayoutEffect(() => {
    const handleResize = () => {
      const { matches: isDesktop } = window.matchMedia('(min-width: 1200px)');

      // Set height to 60px on desktop and full height - 60px (compensation for the navigation bar) on mobile
      setHeight(isDesktop ? 60 : window.innerHeight - 60);

      // Handle scrolling
      if (isDesktop) {
        document.body.style.overflow = 'visible';
      } else if (visible) {
        document.body.style.overflow = 'hidden';
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [visible]);

  const handleNavigation = () => {
    // Disable scrolling when the navigation is visible on mobile
    document.body.style.overflow = visible ? 'visible' : 'hidden';

    setVisible(!visible);
  };

  const handleLink = (url) => {
    navigate(`/${url === 'home' ? '' : url}`);

    handleNavigation();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');

    dispatch(setIsAuthenticated(false));

    navigate('/login');
  };

  return (
    <nav>
      <span className={styles['nav-logo']} onClick={() => navigate('/')}>
        Moviemates
      </span>
      <div className={styles['nav-content']}>
        <div className={`${styles['nav-items']} ${visible ? '' : styles.hidden}`} style={{ minHeight: height }}>
          {MENU_ITEMS[isAuthenticated ? 'protected' : 'public'].map((menuItem) => {
            return (
              <span key={menuItem} onClick={() => handleLink(menuItem)}>
                {menuItem}
              </span>
            );
          })}
          {isAuthenticated && <span onClick={handleLogout}>logout</span>}
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
