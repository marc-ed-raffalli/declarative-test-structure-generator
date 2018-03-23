'use strict';

const expect = require('chai').expect;

const TestConfig = require('./TestConfig');

describe('TestConfig', () => {

  describe('constructor', () => {

    it('sets config', () => {
      expect(new TestConfig('foo').config).to.equal('foo');
    });

  });

  describe('make', () => {

    it('returns instance of TestConfig', () => {
      const tConf = TestConfig.make('config');

      expect(tConf).to.be.instanceOf(TestConfig);
      expect(tConf.config).to.equal('config');
    });

  });

});
