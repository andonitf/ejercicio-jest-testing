
import { getMembers, getMembersVM } from './selectors';
import { State } from '../../reducers';
import { Member } from './viewModel';
import * as mappers from './mappers';

describe('pages/members/list/selectors spec', () => {
    describe('getMembers', () => {
        it('should return expected members from state', () => {
            // Arrange
            const state: State = {
                login: {
                    loginEntity: null,
                    loginFormErrors: null,
                },
                members: [
                    { id: 1, login: 'Login 1', avatar_url: 'http://avatar/url/1' },
                ],
            };

            // Act
            const result = getMembers(state);

            // Assert
            expect(result).toBe(state.members);
        });
    });
    describe('getMembersVM', () => {
        it('should return expected mapper of member list', () => {
            // Arrange
            const state: State = {
                login: {
                    loginEntity: null,
                    loginFormErrors: null,
                },
                members: [
                  { id: 1, login: 'Login 1', avatar_url: 'http://fake-test-url/member/1' },
                  { id: 2, login: 'Login 2', avatar_url: 'http://fake-test-url/member/2' },
                ],
            };

            const expectedMapperMemberList: Member[] = [
              { id: 1, name: 'Login 1', avatarUrl: 'http://fake-test-url/member/1' },
              { id: 2, name: 'Login 2', avatarUrl: 'http://fake-test-url/member/2' },
            ];

            const mapMemberListModelToVMStub = jest.spyOn(mappers, 'mapMemberListModelToVM')
                .mockReturnValue(expectedMapperMemberList);

            // Act
            const result = getMembersVM(state);
            getMembersVM(state);
            getMembersVM(state);

            // Assert
            expect(mapMemberListModelToVMStub).toHaveBeenCalledWith(state.members);
            expect(result).toEqual(expectedMapperMemberList);

            // check that selector only have been called once
            expect(mapMemberListModelToVMStub).toHaveBeenCalledTimes(1);

        });
    });
});
