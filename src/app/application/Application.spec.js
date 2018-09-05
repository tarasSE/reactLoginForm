import React from 'react';
import { expect } from 'chai';
import { Application } from './Application';
import { shallow } from 'enzyme';
import '../shared/test-utils/setup';

describe('Application component rendering', () => {
    let appComponent;
    beforeEach(() => {
        appComponent = shallow(<Application/>)
    });

    it('renders the app block', () => {
        expect(appComponent.find('.app')).to.have.length(1);
    });

    it('renders the success block when login successful', () => {
        appComponent.setState({loginSuccessful: true});

        expect(appComponent.find('.success')).to.have.length(1);
        expect(appComponent.find('.success').render().text()).to.equal('Login successful!');
        expect(appComponent.find('.form-block')).to.have.length(0);
    });

    it('not renders the success block when login is not successful', () => {
        appComponent.setState({loginSuccessful: false});

        expect(appComponent.find('.success')).to.have.length(0);
    });
});