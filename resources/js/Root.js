import React, { useEffect } from 'react';
import {
    Router,
    Switch,
    Route
} from "react-router-dom";
import { connect } from 'react-redux';

import { history } from './history';
import { fetchUser } from './actions/user';
import { fetchConfig } from './actions/config';
import { isLoggedIn } from './helpers';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function Root(props) {
    useEffect(() => {
        if (Object.keys(props.config).length === 0) {
            props.fetchConfig();
        }
        if (isLoggedIn()) {
            props.fetchUser();
        }
    }, []);

    return (
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
    );
}

const mapStateToProps = state => ({
    user: state.user,
    config: state.config,
});
const mapDispatchToProps = dispatch => ({
    fetchUser: () => dispatch(fetchUser()),
    fetchConfig: () => dispatch(fetchConfig()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
