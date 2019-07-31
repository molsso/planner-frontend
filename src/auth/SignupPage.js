import React, {useState} from 'react';
import authService from '../commons/auth.service';
import './LoginPage.css';
import {Link, Redirect} from "react-router-dom";

function SignupPage() {

    const [fullName, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function submit(e) {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        authService.signup({username, password, fullName})
            .then(() => {
                alert("Your account was created!");
                setRedirect(true);
            })
            .catch((e) => {
                setError(e && e.response.data.message ? e.response.data.message : "Something went wrong.");
            })
            .then(() => {
                setIsLoading(false);
            });
    }

    if (redirect) {
        return <Redirect to="/auth/login"/>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Planner - registration</h1>
                </div>
            </div>

            <div className="row">
                <div className="login-form">
                    <form onSubmit={submit}>
                        <h2 className="text-center">Sign up</h2>

                        <div className="error">{error}</div>

                        <div className="form-group">
                            <input type="text"
                                   className="form-control"
                                   placeholder="Full name"
                                   autoComplete="full-name"
                                   required="required"
                                   value={fullName}
                                   onChange={e => setFullname(e.target.value)}
                            />
                        </div>
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
                                Signup
                            </button>
                        </div>
                        {/*<div className="clearfix">*/}
                        {/*    <a href="#" className="pull-right">Forgot Password?</a>*/}
                        {/*</div>*/}
                    </form>
                    <p className="text-center">
                        <Link to="/auth/login">Login to an Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;