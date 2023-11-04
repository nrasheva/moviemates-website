import './App.css';

import { Navigation } from './components/Navigation/Navigation';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <Outlet />
    </Provider>
  );
}

export default App;
