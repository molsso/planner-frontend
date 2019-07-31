import React, {useState} from 'react';
import authService from '../commons/auth.service';
import {Link, Redirect} from "react-router-dom";
import './LoginPage.css';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function submit(e) {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        authService.login(username, password)
            .then(() => {
                setRedirect(true);
            })
            .catch(() => {
                setError("Wrong credentials.");
            })
            .then(() => {
                setIsLoading(false);
            });
    }

    if (redirect) {
        return <Redirect to="/"/>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Planner - login page</h1>
                </div>
            </div>

            <div className="row">
                <div className="login-form">
                    <form onSubmit={submit}>
                        <h2 className="text-center">Log in</h2>

                        <div className="error">{error}</div>

                        <div className="form-group">
                            <input type="text"
                                   className="form-control"
                                   placeholder="Username"
                                   autoComplete="current-username"
                                   required="required"
                                   value={username}
                                   onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input type="password"
                                   className="form-control"
                                   placeholder="Password"
                                   autoComplete="current-password"
                                   required="required"
                                   value={password}
                                   onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit"
                                    className="btn btn-primary btn-block"
                                    disabled={isLoading}>
                                {isLoading ? <i className="fa fa-spin fa-spinner"/> : null}
                                Log in
                            </button>
                        </div>
                        {/*<div className="clearfix">*/}
                        {/*    <a href="#" className="pull-right">Forgot Password?</a>*/}
                        {/*</div>*/}
                    </form>
                    <p className="text-center">
                        <Link to="/auth/signup">Create an Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;