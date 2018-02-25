const expect = require('chai').expect;

const {isRealString} = require('./validation');

describe('#isRealString', () => {

  it('should reject non-string values', () => {
    expect(isRealString(9)).to.be.false;
    expect(isRealString([])).to.be.false;
    expect(isRealString(true)).to.be.false;
  });

  it('should reject a string with only spaces', () => {
    expect(isRealString('')).to.be.false;
    expect(isRealString('    ')).to.be.false;
  });

  it('should allow a string with non-space characters', () => {
    expect(isRealString('test')).to.be.true;
    expect(isRealString('super test')).to.be.true;
    expect(isRealString('  tricky test one')).to.be.true;
    expect(isRealString('tricky test two   ')).to.be.true;
  });
});