import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import 'intl';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './store/rootReducer';
import App from './App';
import I18n from './I18n.jsx';

const store = createStore(
    combineReducers({ ...rootReducer })
    , applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <I18n>
            <App />
        </I18n>
    </Provider>
    , document.getElementById('root')
);

(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev') ?
    registerServiceWorker() : null;

