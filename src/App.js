import { Provider } from 'react-redux';
import './App.css';
import store from './app/store';
import NavBar from './app/nav/Nav';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
