import React, {Component} from 'react';
import './Login.css';

const errors = {
    noEmail: 'Email can\'t be empty',
    invalidEmail: 'Please enter valid email',
    noPassword: 'Password can\'t be empty',
    invalidPassword: 'The value of the password should be at least 6 characters long (including at least one upper case letter, one lower case and one number)',
    wrongCreds: 'Invalid login or password'
};

const isEmailValid = value => {
    return /^[^.]{1}\.?([\w\-_]+)?\.?\w+@[^-][\w-_]+(\.\w+){1,}$/igm.test(value);
};

const isPasswordValid = value => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value);
};

function Error(params) {
    return (
        <div className="error-block">
            <div className="error">{params.text}</div>
        </div>
    )
}

export class Login extends Component {
    state = {
        email: '',
        password: '',
        remember: false,
        passwordValid: false,
        emailValid: false,
        canShowPasswordErrors: false,
        canShowEmailErrors: false,
        loginSuccessful: false,
        wrongCreds: false,
    };

    email = 'test@test.pl';
    password = 'Password1';

    login = () => {
        if (!isPasswordValid(this.state.password)) {
            this.setState({
                passwordValid: false
            });
            return;
        }

        if (this.email === this.state.email && this.password === this.state.password) {
            this.setState({
                loginSuccessful: true,
                wrongCreds: false
            });
            return;
        }

        this.setState({
            loginSuccessful: false,
            wrongCreds: true
        });
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

    showEmailErrors = () => {
        this.setState(
            {canShowEmailErrors: true}
        );
    };

    showPasswordErrors = () => {
        this.setState(
            {canShowPasswordErrors: true}
        );
    };

    render() {
        const {
            email,
            password,
            remember,
            emailValid,
            passwordValid,
            canShowEmailErrors,
            canShowPasswordErrors,
            loginSuccessful,
            wrongCreds
        } = this.state;

        return (
            <div className="app">
                {!loginSuccessful && <div className="form-block">
                    <form>
                        <fieldset>
                            <div className="input-block">
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" id="email" placeholder="Email"
                                       onChange={this.emailChange} onBlur={this.showEmailErrors}
                                       onKeyPress={this.submitByEnter}
                                       required/>
                            </div>
                            {canShowEmailErrors && !email && <Error text={errors.noEmail}/>}
                            {canShowEmailErrors && email && !emailValid && <Error text={errors.invalidEmail}/>}
                            <div className="input-block">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" placeholder="Password"
                                       onChange={this.passwordChange} onBlur={this.showPasswordErrors}
                                       onKeyPress={this.submitByEnter}
                                       required/>
                            </div>
                            {canShowPasswordErrors && !password && <Error text={errors.noPassword}/>}
                            {canShowPasswordErrors && password && !passwordValid &&
                            <Error text={errors.invalidPassword}/>}
                            {wrongCreds && <Error text={errors.wrongCreds}/>}
                            <div className="remember-block">
                                <label htmlFor="remember">
                                    <input type="checkbox" name="remember" id="remember"/> Remember me
                                </label>
                            </div>
                            <div className="button-block">
                                <button className="button" type="button" onClick={this.login}>Login</button>
                            </div>
                        </fieldset>
                    </form>
                </div>}
                {loginSuccessful && <div className="success"><h1>Login successful!</h1></div>}
            </div>
        );
    }
}

export {isEmailValid, isPasswordValid, Error, errors}
export default Login;
