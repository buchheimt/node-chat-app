const expect = require('chai').expect;

const {Users} = require('./users');

describe('Users', () => {

  it('should add new user', () => {
    const users = new Users();
    const newUser = users.addUser('123', 'Tyler', 'Westworld Fans');

    expect(users.users).to.deep.equal([newUser]);
  });
});