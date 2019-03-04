import * as React from 'react';
import { shallow } from 'enzyme';
import { Body } from './body';

describe('pages/members/list/components/body specs', () => {
    it('should render the component as expected when passing required properties', () => {
        // Arrange
        const props = {
            members: [
                { id: 1, name: 'test name 1', avatarUrl: 'http://some/avatar/url/1'},
            ],
        };

        // Act
        const component = shallow(<Body members={props.members} />);

        // Assert
        expect(component).toMatchSnapshot();
    });
});
