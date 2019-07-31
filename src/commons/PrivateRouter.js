import React from 'react';
import authService from "./auth.service";
import {Redirect, Route} from "react-router-dom";

function PrivateRoute({component: Component, ...rest}) {
    return (
        <Route {...rest} render={(props) => (

            authService.isAuthenticated() === true
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/auth/login',
                    state: {from: props.location}
                }}/>

        )}/>
    );
}

export default PrivateRoute;