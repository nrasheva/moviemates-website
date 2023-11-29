import './App.css';

import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { Navigation } from './components/Navigation/Navigation';
import { Overlay } from './layout/Overlay';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <Overlay />
      <Outlet />
    </Provider>
  );
}

export default App;
