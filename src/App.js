import { Provider } from 'react-redux';
import './App.css';
import store from './app/store';
import NavBar from './app/nav/Nav';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

function App() {
  const token = localStorage.getItem('authToken');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
