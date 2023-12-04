import './App.css';

import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { Navigation } from './components/Navigation/Navigation';
import { Modal } from './layout/Modal/Modal';
import { Overlay } from './layout/Overlay/Overlay';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Modal />
      <Navigation />
      <Outlet />
      <Overlay />
    </Provider>
  );
}

export default App;
