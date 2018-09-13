import React, {Component} from 'react';
import './Login.css';
import {errors, isEmailValid, isPasswordValid} from './constants';
import {Error} from '../error/Error';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        remember: false,
        passwordValid: false,
        emailValid: false,
        canShowPasswordErrors: false,
        canShowEmailErrors: false,
        wrongCreds: false,
    };

    props = {
        setLoginSuccessful: null,
        authService: {}
    };

    login = () => {
        if (!isPasswordValid(this.state.password)) {
            this.setState({
                passwordValid: false
            });
            return;
        }
        this.props.authService.login(this.state.email, this.state.password)
            .then(this.onLoginSuccess)
            .catch(this.onLoginError);
    };

    onLoginSuccess = response => {
        this.setState({
            wrongCreds: false
        });
        this.props.setLoginSuccessful(response.loginSuccessful);
    };

    onLoginError = error => {
        this.setState({
            wrongCreds: true
        });
        this.props.setLoginSuccessful(error.loginSuccessful);
    };

    emailChange = event => {
        const value = event.target.value;
        this.setState({
            email: value,
            emailValid: isEmailValid(value),
            wrongCreds: false
        });
    };

    passwordChange = event => {
        const value = event.target.value;
        this.setState({
            password: value,
            passwordValid: isPasswordValid(value),
            wrongCreds: false
        });
    };

    submitByEnter = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.login();
        }
    };

    showEmailErrors = event => {
        this.emailChange(event);
        this.setState(
            {canShowEmailErrors: true}
        );
    };

    showPasswordErrors = event => {
        this.passwordChange(event);
        this.setState(
            {canShowPasswordErrors: true}
        )
    };

    render() {
        const {
            email,
            password,
            emailValid,
            passwordValid,
            canShowEmailErrors,
            canShowPasswordErrors,
            wrongCreds
        } = this.state;


        return (
            <div className="form-block">
                <form>
                    <fieldset>
                        <div className="input-block">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onBlur={this.showEmailErrors}
                                onKeyPress={this.submitByEnter}
                                required/>
                        </div>
                        <Error
                            id="no-email-error"
                            text={errors.noEmail}
                            show={canShowEmailErrors && !email}/>
                        <Error id="invalid-email-error"
                               text={errors.invalidEmail}
                               show={canShowEmailErrors && email && !emailValid}/>
                        <div className="input-block">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                   name="password"
                                   id="password"
                                   placeholder="Password"
                                   onBlur={this.showPasswordErrors}
                                   onKeyPress={this.submitByEnter}
                                   required/>
                        </div>
                        <Error id="no-password-error"
                               text={errors.noPassword}
                               show={canShowPasswordErrors && !password}/>
                        <Error id="invalid-password-error"
                               text={errors.invalidPassword}
                               show={canShowPasswordErrors && password && !passwordValid}/>
                        <Error id="wrong-creds-error"
                               text={errors.wrongCreds}
                               show={wrongCreds}/>
                        <div className="remember-block">
                            <label htmlFor="remember">
                                <input type="checkbox"
                                       name="remember"
                                       id="remember"/>
                                Remember me
                            </label>
                        </div>
                        <div className="button-block">
                            <button className="button"
                                    type="button"
                                    onClick={this.login}>
                                Login
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export {Login, Error};
