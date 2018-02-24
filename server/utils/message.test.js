const expect = require('chai').expect;
const {generateMessage} = require('./message');

describe('generateMessage', () => {

  it('should generate the correct message object', () => {
    const from = 'user';
    const text = 'testing... 123';
    const newMessage = generateMessage(from, text);

    expect(newMessage.from).to.equal(from);
    expect(newMessage.text).to.equal(text);
    expect(newMessage.createdAt).to.be.a('number');
  });
});