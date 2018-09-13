import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import MockAuthService from "../shared/auth/MockAuthService";
import {Login} from './Login';
import {errors} from "./constants";
import '../shared/test-utils/setup';

const mockEvent = {target: {}};
describe('Login component rendering', () => {
    let loginComponent;
    beforeEach(() => {
        loginComponent = shallow(<Login setLoginSuccessful={success => success} authService={new MockAuthService()}/>)
    });

    it('renders the form-block', () => {
        expect(loginComponent.find('.form-block')).to.have.length(1);
    });

    it('renders the fieldset ', () => {
        expect(loginComponent.find('fieldset')).to.have.length(1);
    });

    it('renders the input-block', () => {
        expect(loginComponent.find('.input-block')).to.have.length(2);
        expect(loginComponent.find('.input-block').at(0).render().text()).to.equal('Email');
        expect(loginComponent.find('.input-block').at(1).render().text()).to.equal('Password');
    });

    it('renders the remember-block', () => {
        expect(loginComponent.find('.remember-block')).to.have.length(1);
        expect(loginComponent.find('.remember-block').render().text().trim()).to.equal('Remember me');
    });

    it('renders the button-block', () => {
        expect(loginComponent.find('.button-block')).to.have.length(1);
        expect(loginComponent.find('.button-block').render().text()).to.equal('Login');
    });

    it('renders the error block when credentials are wrong', () => {
        loginComponent.setState({wrongCreds: true});

        expect(loginComponent.find('#wrong-creds-error')).to.have.length(1);
        expect(loginComponent.find('#wrong-creds-error').render().text()).to.equal(errors.wrongCreds);
    });

    it('renders no error when credentials are correct', () => {
        loginComponent.setState({wrongCreds: false});

        expect(loginComponent.find('.error-block')).to.have.length(0);
    });

    it('renders no error on start', () => {
        expect(loginComponent.find('.error-block')).to.have.length(0);
    });

    it('renders the error block when email input touched and empty', () => {
        const email = loginComponent.find('#email');
        email.simulate('focus', mockEvent);
        email.simulate('blur', mockEvent);

        expect(loginComponent.find('#no-email-error')).to.have.length(1);
        expect(loginComponent.find('#no-email-error').render().text()).to.equal(errors.noEmail);
    });

    it('renders the error block when password input touched and empty', () => {
        const password = loginComponent.find('#password');
        password.simulate('focus', mockEvent);
        password.simulate('blur', mockEvent);

        expect(loginComponent.find('#no-password-error')).to.have.length(1);
        expect(loginComponent.find('#no-password-error').render().text()).to.equal(errors.noPassword);
    });


    it('renders the error block when email input touched and value is invalid', () => {
        const email = loginComponent.find('#email');
        email.simulate('focus', mockEvent);
        email.simulate('blur', {target: {value: 'invalid_email.pl'}});

        expect(loginComponent.find('#invalid-email-error')).to.have.length(1);
        expect(loginComponent.find('#invalid-email-error').render().text()).to.equal(errors.invalidEmail);
    });

    it('renders the error block when password input touched and value is invalid', () => {
        const password = loginComponent.find('input').at(1);
        password.simulate('focus', mockEvent);
        password.simulate('blur', {target: {value: 'invalid_password'}});

        expect(loginComponent.find('#invalid-password-error')).to.have.length(1);
        expect(loginComponent.find('#invalid-password-error').render().text()).to.equal(errors.invalidPassword);
    });

    it('renders the input-block', () => {
        expect(loginComponent.find('.input-block')).to.have.length(2);
        expect(loginComponent.find('.input-block').at(0).render().text()).to.equal('Email');
        expect(loginComponent.find('.input-block').at(1).render().text()).to.equal('Password');
    });

});