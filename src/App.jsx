import './App.css';

import { Navigation } from './components/Navigation/Navigation';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useLayoutEffect } from 'react';

function App() {
  useLayoutEffect(() => {
    const handleHeight = () => {
      const root = document.querySelector('#root');

      if (root) {
        root.style.minHeight = `${window.innerHeight}px`;
      }
    };

    handleHeight();

    window.addEventListener('resize', handleHeight);

    return () => {
      window.removeEventListener('resize', handleHeight);
    };
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
      <Outlet />
    </Provider>
  );
}

export default App;
