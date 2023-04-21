import { PersistGate } from 'redux-persist/integration/react';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import store, { presistor } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={presistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
