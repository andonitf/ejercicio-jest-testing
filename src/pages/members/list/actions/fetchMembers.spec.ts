import { actionIds } from './actionIds';
import { fetchMembers } from './fetchMembers';
import { Member } from '../../../../rest-api/model/member';
import * as memberAPI from '../../../../rest-api/api/member';
import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';

const getMockStore = configureStore([reduxThunk]);

describe('pages/members/actions/fetchMembers spec', () => {
  describe('UpdateMembers Tests', () => {
    it('Should call fetchMembers function', (done) => {
      // Arrange
      jest.spyOn(memberAPI, 'fetchMembers').mockResolvedValue([]);
      const store = getMockStore();

      // Act
      store.dispatch<any>(fetchMembers()).then(() => {

        // Assert
        expect(memberAPI.fetchMembers).toHaveBeenCalled();
        done();
      });
    });

    it(`should return an action with UPDATE_MEMBERS type and empty
        payload when call fetchMembers function and it resolves with no data`, (done) => {
      // Arrange
      jest.spyOn(memberAPI, 'fetchMembers').mockResolvedValue([]);

      const store = getMockStore();

      // Act
      store.dispatch<any>(fetchMembers()).then(() => {

        // Assert
        const action = store.getActions()[0];
        expect(action.type).toEqual(actionIds.UPDATE_MEMBERS);
        expect(action.payload).toEqual([]);
        done();
      });
    });

    it(`should return and action wit UPDATE_MEMBERS type and
        with some data payload when call fetchMembers function
        and it resolves with some data`, (done) => {
      // Arrange
      const members: Member[] = [
        { id: 1, login: 'Login 1', avatar_url: 'http://fake-test-url/member/1' },
        { id: 2, login: 'Login 2', avatar_url: 'http://fake-test-url/member/2' },
        { id: 3, login: 'Login 3', avatar_url: 'http://fake-test-url/member/3' },
        { id: 4, login: 'Login 4', avatar_url: 'http://fake-test-url/member/4' },
        { id: 4, login: 'Login 5', avatar_url: 'http://fake-test-url/member/5' },
      ];

      jest.spyOn(memberAPI, 'fetchMembers').mockResolvedValue(members);
      const store = getMockStore();

      // Act
      store.dispatch<any>(fetchMembers()).then(() => {

        // Assert
        const action = store.getActions()[0];
        expect(action.type).toEqual(actionIds.UPDATE_MEMBERS);
        expect(action.payload).toEqual(members);
        done();
      });
    });

    it(`should call global.console.log with an error message when call fetchMembers. Message is rejected.`, (done) => {
      // Arrange
      jest.spyOn(memberAPI, 'fetchMembers').mockRejectedValue('test error');
      jest.spyOn(global.console, 'log');

      const store = getMockStore();

      // Act
      store.dispatch<any>(fetchMembers()).then(() => {
        expect(global.console.log).toHaveBeenCalled();
        done();
      });
    });
  });
});
