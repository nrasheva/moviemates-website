import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <p>Hello world</p>
    </Provider>
  );
}

export default App;
