import * as React from 'react';
import { shallow } from 'enzyme';
import { MembersState } from './reducers';
import { MemberListPageContainer } from './pageContainer';
import configureStore from 'redux-mock-store';

const getMockStore = configureStore();

describe('pages/members/list/pageContainer specs', () => {
  it('should render as expect when passing state', () => {
    // Arrange
    const state: MembersState = [
      { id: 1, login: 'Login 1', avatar_url: 'http://fake-test-url/member/1' },
      { id: 2, login: 'Login 2', avatar_url: 'http://fake-test-url/member/2' },
      { id: 3, login: 'Login 3', avatar_url: 'http://fake-test-url/member/3' },
      { id: 4, login: 'Login 4', avatar_url: 'http://fake-test-url/member/4' },
      { id: 4, login: 'Login 5', avatar_url: 'http://fake-test-url/member/5' },
  ];

    const store = getMockStore(state);

    // Act
    const component = shallow(<MemberListPageContainer />, {
      context: { store },
    });

    // Assert
    expect(component).toMatchSnapshot();
  });
});
