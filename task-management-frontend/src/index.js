import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'mobx-react';
import AuthService from "./services/auth/auth.service";
import UserStore from "./stores/users/users.store";
import {StoreProvider} from "./contexts/store-context";

const stores = {};
const services = {};

services.authService = new AuthService();

stores.userStore = new UserStore(services.authService);

ReactDOM.render(
  <React.StrictMode>
      <Provider {...stores}>
          <StoreProvider {...stores}>
              <BrowserRouter>
                  <App />
              </BrowserRouter>
          </StoreProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
