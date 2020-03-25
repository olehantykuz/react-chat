require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducer from './reducers';
import Root from './Root';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

function App() {
    return (
        <Provider store={store}>
            <Root />
        </Provider>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
