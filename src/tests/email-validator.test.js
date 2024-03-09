import { expect } from 'chai';
import sinon  from 'sinon';
import { validate, validateAsync, validateWithThrow, validateWithLog  } from '../scripts/email-validator.js';

describe('validate - basic functionality', () => {
  it('returns \'true\' when email ending is valid', () => {
    expect(validate('email@gmail.com')).to.equal(true);
    expect(validate('email@yandex.ru')).to.equal(true);
    expect(validate('email@outlook.com')).to.equal(true);
  });
  it('returns \'false\' when email ending is not valid', () => {
    expect(validate('email@mail.ru')).to.equal(false);
    expect(validate('email@mail.com')).to.equal(false);
    expect(validate('email@test.com')).to.equal(false);
  });
});

describe('validateAsync - basic functionality', () => {
  it('asynchronously returns \'true\' when email ending is valid', async () => {
    expect(await validateAsync('email@gmail.com')).to.equal(true);
    expect(await validateAsync('email@yandex.ru')).to.equal(true);
    expect(await validateAsync('email@outlook.com')).to.equal(true);
  });
  it('asynchronously returns \'false\' when email ending is not valid', async() => {
    expect(await validateAsync('email@mail.ru')).to.equal(false);
    expect(await validateAsync('email@mail.com')).to.equal(false);
    expect(await validateAsync('email@test.com')).to.equal(false);
  });
});

describe('validateWithThrow - basic functionality', () => {
  it('returns \'true\' when email ending is valid', () => {
    expect(validateWithThrow('email@gmail.com')).to.equal(true);
    expect(validateWithThrow('email@yandex.ru')).to.equal(true);
    expect(validateWithThrow('email@outlook.com')).to.equal(true);
  });
  it('throws an error when email ending is not valid', () => {
    expect(() => validateWithThrow('email@mail.ru')).to.throw(Error, 'Email is not valid');
    expect(() => validateWithThrow('email@mail.com')).to.throw(Error, 'Email is not valid');
    expect(() => validateWithThrow('email@test.com')).to.throw(Error, 'Email is not valid');
  });

});

describe('validateWithLog - basic functionality', () => {
  let consoleLogStub;

  beforeEach(() => {
    consoleLogStub = sinon.stub(console, 'log');
  });
  
  afterEach(() => {
    consoleLogStub.restore();
  });

  it('logs \'true\' to the console before returning it', () => {
    // expect(validateWithLog('email@gmail.com')).to.equal(true);
    validateWithLog('test@gmail.com');
    expect(consoleLogStub.calledOnceWithExactly(true)).to.be.true;
  });

  it('logs \'false\' to the console before returning it', () => {
    // expect(validateWithLog('email@mail.ru')).to.equal(false);
    validateWithLog('test@gfmail.com');
    expect(consoleLogStub.calledOnceWithExactly(false)).to.be.true;
  });
});
