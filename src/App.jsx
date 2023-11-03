import './App.css';

import { DiscoverMovies } from './components/DiscoverMovies/DiscoverMovies';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <DiscoverMovies />
    </Provider>
  );
}

export default App;
