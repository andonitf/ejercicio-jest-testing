import { membersReducer, MembersState } from './members';
import { actionIds } from '../actions/actionIds';
import deepFreeze from 'deep-freeze';

describe('pages/members/list/reducers/memberReducers spec', () => {
  it('should return initial state when passing state equals undefined and some action', () => {
    // Arrange
    const state = undefined;
    const action = { type: 'test type' };

    // Act
    const result = membersReducer(state, action);

    // Assert
    expect(result).toEqual([]);
  });
  it('should return same state when passing state with some values and some action', () => {
    // Arrange
    const state: MembersState = [
      { id: 1, login: 'Login 1', avatar_url: 'http://fake-test-url/member/1' },
      { id: 2, login: 'Login 2', avatar_url: 'http://fake-test-url/member/2' },
      { id: 3, login: 'Login 3', avatar_url: 'http://fake-test-url/member/3' },
      { id: 4, login: 'Login 4', avatar_url: 'http://fake-test-url/member/4' },
      { id: 4, login: 'Login 5', avatar_url: 'http://fake-test-url/member/5' },
      ];
    const action = { type: 'test type' };

    // Act
    const result = membersReducer(state, action);

    // Assert
    expect(result).toEqual(state);
  });
  it(`should return new state when passing an action type MEMBER_REQUEST_COMPLETED
      and payload wit some new values`, () => {
    // Arrange
    const state: MembersState = [
      { id: 1, login: 'test name 1', avatar_url: 'http://some/avatar/url/1' },
    ];

    const newState = {
      members: [
        { id: 1, login: 'test name 1', avatar_url: 'http://some/avatar/url/1' },
        { id: 2, login: 'test name 2', avatar_url: 'http://some/avatar/url/2' },
        { id: 3, login: 'test name 3', avatar_url: 'http://some/avatar/url/3' },
        { id: 4, login: 'test name 4', avatar_url: 'http://some/avatar/url/4' },
      ],
    };

    const action = {
      type: actionIds.UPDATE_MEMBERS,
      payload: newState,
    };

    deepFreeze(state);

    // Act
    const result = membersReducer(state, action);

    // Assert
    expect(result).toEqual(newState);
  });
});
