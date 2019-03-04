import * as React from 'react';
import { shallow } from 'enzyme';
import { Row } from './row';
import { Member } from '../viewModel';

describe('pages/members/list/components/row specs', () => {
    it('should render the component as expected when passing required properties', () => {
        // Arrange
        const member: Member = {
            id: 1,
            name: 'User Name 1',
            avatarUrl: 'http://fake-server-url/member/avatar/url/',
        };

        const props = { member };

        // Act
        const component = shallow(<Row member={props.member} />);

        // Assert
        expect(component).toMatchSnapshot();
    });
});
