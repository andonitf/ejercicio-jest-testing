import * as React from 'react';
import { shallow } from 'enzyme';
import { Table } from './table';

describe('pages/members/list/components/table specs', () => {
    it('should render the component as expected when passing required properties', () => {
        // Arrange
        const props = {
            members: [
                { id: 1, name: 'Login 1', avatarUrl: 'http://fake-server-url/member/avatar/url/1' },
            ],
        };

        // Act
        const component = shallow(<Table members={props.members} />);

        // Assert
        expect(component).toMatchSnapshot();
    });
});
