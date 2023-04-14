import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import Store from './components/store/Store';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Provider store={Store}>
      <App />
    </Provider>
    </BrowserRouter>
);
reportWebVitals();