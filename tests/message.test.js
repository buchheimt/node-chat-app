/* global describe, it */

const { expect } = require('chai');
const { generateMessage, generateLocationMessage } = require('./../server/utils/message');

describe('#generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'user';
    const text = 'testing... 123';
    const newMessage = generateMessage(from, text);

    expect(newMessage).to.include({ from, text });
    expect(newMessage.createdAt).to.be.a('number');
  });
});

describe('#generateLocationMessage', () => {
  it('should generate the correct location object', () => {
    const from = 'user';
    const lat = 1234123;
    const long = 4142342;
    const url = `https://www.google.com/maps?q=${lat},${long}`;
    const newLocationMessage = generateLocationMessage(from, lat, long);

    expect(newLocationMessage).to.include({ from, url });
    expect(newLocationMessage.createdAt).to.be.a('number');
  });
});
