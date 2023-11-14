import './App.css';

import { useLayoutEffect } from 'react';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { Navigation } from './components/Navigation/Navigation';
import { store } from './redux/store';

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
