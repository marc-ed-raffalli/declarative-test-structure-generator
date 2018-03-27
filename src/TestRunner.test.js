'use strict';

const expect = require('chai').expect,
  sinon = require('sinon');

const TestRunner = require('./TestRunner'),
  TestSuite = require('./TestSuite');

describe('TestRunner', () => {

  describe('run', () => {

    let testStubs,
      def;

    beforeEach(() => {
      testStubs = [];
      def = {def: 123};

      sinon.stub(TestSuite, 'generate').callsFake(() => testStubs);
    });

    afterEach(() => {
      TestSuite.generate.restore();
    });

    it('calls generate with test suite', () => {
      TestRunner.run(def);

      expect(TestSuite.generate.calledOnce).to.be.true;
      expect(TestSuite.generate.calledWithExactly(def)).to.be.true;
    });

    it('calls run() on every generated test suites', () => {
      testStubs = [
        {run: sinon.spy()},
        {run: sinon.spy()}
      ];

      TestRunner.run(def);

      testStubs.forEach(stub => {
        expect(stub.run.calledOnce).to.be.true;
      });
    });

  });

});
