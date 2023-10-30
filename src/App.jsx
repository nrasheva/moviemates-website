import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Genres } from './components/Genres/Genres';

function App() {
  return (
    <Provider store={store}>
      <p>Hello world</p>
      <Genres />
    </Provider>
  );
}

export default App;
