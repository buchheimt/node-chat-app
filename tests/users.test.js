/* global describe, it, beforeEach */

const { expect } = require('chai');

const { Users } = require('./../server/utils/users');

describe('Users', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Tyler',
      room: 'React Course',
    }, {
      id: '2',
      name: 'Emma',
      room: 'React Course',
    }, {
      id: '3',
      name: 'Arya',
      room: 'Dog Course',
    }];
  });

  describe('#addUser', () => {
    it('should add new user', () => {
      const newUser = users.addUser('123', 'Tyler', 'Westworld Fans');

      expect(users.users).to.deep.include(newUser);
    });
  });

  describe('#getUserList', () => {
    it('should return names for given room', () => {
      const reactUsers = users.getUserList('React Course');

      expect(reactUsers).to.include(users.users[0].name);
      expect(reactUsers).to.include(users.users[1].name);
      expect(reactUsers).to.not.include(users.users[2].name);
    });
  });

  describe('#removeUser', () => {
    it('should remove existing user', () => {
      const userToRemove = { ...users.users[1] };
      const removedUser = users.removeUser(userToRemove.id);

      expect(removedUser).to.deep.equal(userToRemove);
      expect(users.users).to.not.deep.include(userToRemove);
      expect(users.users.length).to.equal(2);
    });

    it('should do nothing if user does not exist', () => {
      const removedUser = users.removeUser(123);

      expect(removedUser).to.equal(undefined);
      expect(users.users.length).to.equal(3);
    });
  });

  describe('#getUser', () => {
    it('should find existing user', () => {
      const user = users.getUser(users.users[0].id);

      expect(user).to.deep.equal(users.users[0]);
    });

    it('should return undefined if user does not exist', () => {
      const user = users.getUser(123);

      expect(user).to.equal(undefined);
    });
  });
});
