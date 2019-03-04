import { mapMemberListModelToVM } from './mappers';
import { Member } from '../../../rest-api/model/member';

describe('pages/members/list/mappers specs', () => {
  describe('mapMemberListModelToVM function test', () => {
    it('should return an array with one item and same values when passing an array of Members with one item', () => {
      // Arrange
      const id: number = 1;
      const login: string = 'some login';
      const url: string = 'http://some/avatar/url/';

      const members: Member[] = [
        {
          id,
          login,
          avatar_url: url,
        },
      ];

      // Act
      const result = mapMemberListModelToVM(members);

      // Assert
      expect(result).toEqual([
        {
          id,
          name: login,
          avatarUrl: url,
        },
      ]);
    });

    it('should return an empty array when passing an empty array as parameter', () => {
      // Arrange
      const members: Member[] = [];

      // Act
      const result = mapMemberListModelToVM(members);

      // Assert
      expect(result).toEqual([]);
    });

    it('should return an empty array when passing null as array as parameter', () => {
      // Act
      const result = mapMemberListModelToVM(null);

      // Assert
      expect(result).toEqual([]);
    });

    it('should return an empty array when passing undefined as array as parameter', () => {
      // Act
      const result = mapMemberListModelToVM(undefined);

      // Assert
      expect(result).toEqual([]);
    });
  });
});
