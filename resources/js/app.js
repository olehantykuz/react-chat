require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
    return (
        <Router>
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
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
