'use strict';

const expect = require('chai').expect;

const Test = require('./Test'),
  TestBlock = require('./TestBlock');

describe('Test', () => {

  it('instance of TestBlock', () => {
    expect(new Test()).to.be.instanceOf(TestBlock);
  });

  describe('methods', () => {

    describe('getRunTestBlock', () => {

      it('returns mocha.it', () => {
        expect(new Test().getRunTestBlock()).to.equal(it);
      });

    });

    describe('getRunOnlyTestBlock', () => {

      it('returns mocha.it.only', () => {
        expect(new Test().getRunOnlyTestBlock()).to.equal(it.only);
      });

    });

    describe('getSkipTestBlock', () => {

      it('returns mocha.it.skip', () => {
        expect(new Test().getSkipTestBlock()).to.equal(it.skip);
      });

    });

    describe('run', () => {

      it('returns def.test', () => {
        expect(new Test({test: 'foo'}).run()).to.equal('foo');
      });

    });

  });

});
