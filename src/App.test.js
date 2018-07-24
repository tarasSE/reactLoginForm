import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import App from './App';

describe('App', () => {

    beforeEach(() => {
        component = shallow(<App/>)
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');

        ReactDOM.render(<App/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders without crashi', () => {
        const app = new App;
        app.isEmailValid('test@test.pl');
    });

});