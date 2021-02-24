import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import createSagaMiddleware from 'redux-saga'
import {watchAuth} from './store/sagas/index'

const rootReducer = combineReducers({
    burgerBuilderReducer,
    orderReducer,
    auth: authReducer
});

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(rootReducer, compose(applyMiddleware)(thunk, sagaMiddleWare));

sagaMiddleWare.run(watchAuth);

const app = (
    <Provider store={store}>
    <BrowserRouter basename="/burger-app/">
        <App />
    </BrowserRouter>
    </Provider>
);

ReactDOM.render(
  <React.StrictMode>
      {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
