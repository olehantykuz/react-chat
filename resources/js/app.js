require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Switch,
    Route
} from "react-router-dom";
import { createBrowserHistory } from 'history';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducer from './reducers';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export const history = createBrowserHistory();

function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/register">
                        <RegisterPage />
                    </Route>
                    <Route path="/">
                        <MainPage />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
