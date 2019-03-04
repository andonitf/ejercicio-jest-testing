import * as React from 'react';
import { shallow } from 'enzyme';
import { Header } from './header';

describe('pages/members/list/components/header specs', () => {
    it('should render the component as expected', () => {
        // Act
        const component = shallow(<Header />);

        // Assert
        expect(component).toMatchSnapshot();
    });
});
