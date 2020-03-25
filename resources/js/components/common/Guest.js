import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function Guest() {
    return (
        <div className="guest">
            <div className="row justify-content-center guest__header">
                <h3>Hello Guest!</h3>
            </div>
            <div className="row justify-content-center guest__body">
                <div className="col-sm-8">
                    <h4 className="text-center">
                        You are not logged in to our chat. To get the opportunity to use all available functions, please
                        &nbsp;<Link to="/register">Register</Link>
                        &nbsp;or <Link to="/login">Login</Link>.
                    </h4>
                </div>
            </div>
        </div>
    );
}
