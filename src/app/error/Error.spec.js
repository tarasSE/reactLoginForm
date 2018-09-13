import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {Error} from "./Error";
import '../shared/test-utils/setup';

const mockText = "This is a mock text";
describe('Error component rendering', () => {
    let errorComponent;
    beforeEach(() => {
        errorComponent = shallow(<Error />)
    });

    it('renders the error block when show property is true', () => {
        errorComponent.setProps({text: mockText, show: true});
        expect(errorComponent.find('.error-block')).to.have.length(1);
        expect(errorComponent.find('.error')).to.have.length(1);
        expect(errorComponent.find('.error').render().text()).to.equal(mockText);
    });

    it('renders no error block when show property is false', () => {
        errorComponent.setProps({text: mockText, show: false});
        expect(errorComponent.find('.error-block')).to.have.length(0);
        expect(errorComponent.find('.error')).to.have.length(0);
    });
});