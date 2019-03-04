import * as React from 'react';
import { mount } from 'enzyme';
import { MemberListPage } from './page';
import { Member } from './viewModel';

describe('pages/members/list/page specs', () => {
  it('should render the MemberListPage component as expected when passing required properties', () => {

    // Arrange
    const members: Member[] = [
      {
        id: 1,
        name: 'Login 1',
        avatarUrl: 'http://fake-test-url/member/1',
      },
      {
        id: 2,
        name: 'Login 2',
        avatarUrl: 'http://fake-test-url/member/2',
      },
    ];
    const props = { members };

    // Act
    const component = mount(<MemberListPage members={props.members} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
