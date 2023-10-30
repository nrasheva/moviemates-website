import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { DiscoverMovies } from './components/DiscoverMovies/DiscoverMovies';

function App() {
  return (
    <Provider store={store}>
      <DiscoverMovies />
    </Provider>
  );
}

export default App;
