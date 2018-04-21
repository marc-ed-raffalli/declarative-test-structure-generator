'use strict';

const expect = require('chai').expect,
  sinon = require('sinon');

const TestRunner = require('./TestRunner'),
  TestBlock = require('./TestBlock'),
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

    it('calls build() on every generated test suites', () => {
      testStubs = [
        {build: sinon.spy()},
        {build: sinon.spy()}
      ];

      TestRunner.run(def);

      testStubs.forEach(stub => {
        expect(stub.build.calledOnce).to.be.true;
      });
    });

  });

  describe('integration', () => {

    let mockTestLib;

    beforeEach(() => {
      mockTestLib = {
        describe: (name, cb) => cb(),
        it: sinon.stub(),
        before: sinon.stub(),
        beforeEach: sinon.stub(),
        after: sinon.stub(),
        afterEach: sinon.stub()
      };

      mockTestLib.describe.only = (name, cb) => cb();
      mockTestLib.describe.skip = (name, cb) => cb();

      sinon.spy(mockTestLib, 'describe');
      sinon.spy(mockTestLib.describe, 'only');
      sinon.spy(mockTestLib.describe, 'skip');

      mockTestLib.it.only = sinon.stub();
      mockTestLib.it.skip = sinon.stub();

      sinon.stub(TestBlock, 'getTestLib').returns(mockTestLib);
    });

    afterEach(() => {
      TestBlock.getTestLib.restore();
    });

    it('calls all test methods', () => {
      TestRunner.run({
        'Test Suite A': {
          tests: [
            {name: 'Test Suite A - test 1', test: 'testA1'},
            {name: 'Test Suite A - test 2', test: 'testA2'}
          ]
        },
        'Test Suite B': {
          tests: {
            'Test Suite B - nested': {
              tests: [
                {name: 'Test Suite B - test 1', test: 'testB1'}
              ]
            }
          }
        },
        'Test Suite C': {
          tests: [
            {name: 'Test Suite C - test 1', only: true, test: 'testC1'},
            {name: 'Test Suite C - test 2', skip: true, test: 'testC2'}
          ]
        },
        'Test Suite D - only': {
          only: true,
          tests: [
            {name: 'Test Suite D - test 1', test: 'testD1'}
          ]
        },
        'Test Suite E - skipped': {
          skip: true,
          tests: [
            {name: 'Test Suite E - test 1', test: 'testE1'}
          ]
        },
        'Test Suite F - hooks': {
          before: 'f-before',
          beforeEach: 'f-beforeEach',
          after: 'f-after',
          afterEach: 'f-afterEach',
          tests: [
            {name: 'Test Suite F - test 1', test: 'testF1'}
          ]
        },
        'Test Suite G - hooks[]': {
          before: [
            'g-before-1',
            'g-before-2'],
          beforeEach: [
            'g-beforeEach-1',
            'g-beforeEach-2'],
          after: [
            'g-after-1',
            'g-after-2'],
          afterEach: [
            'g-afterEach-1',
            'g-afterEach-2'],
          tests: [
            {name: 'Test Suite G - test 1', test: 'testG1'}
          ]
        }
      });

      expect(mockTestLib.describe.calledWithMatch('Test Suite A')).to.be.true;
      expect(mockTestLib.it.calledWith('Test Suite A - test 1', 'testA1')).to.be.true;
      expect(mockTestLib.it.calledWith('Test Suite A - test 2', 'testA2')).to.be.true;

      expect(mockTestLib.describe.calledWithMatch('Test Suite B')).to.be.true;
      expect(mockTestLib.describe.calledWithMatch('Test Suite B - nested')).to.be.true;
      expect(mockTestLib.it.calledWith('Test Suite B - test 1', 'testB1')).to.be.true;

      expect(mockTestLib.describe.calledWithMatch('Test Suite C')).to.be.true;
      expect(mockTestLib.it.only.calledWithMatch('Test Suite C - test 1', 'testC1')).to.be.true;
      expect(mockTestLib.it.skip.calledWithMatch('Test Suite C - test 2', 'testC2')).to.be.true;

      expect(mockTestLib.describe.only.calledWithMatch('Test Suite D - only')).to.be.true;
      expect(mockTestLib.it.calledWith('Test Suite D - test 1', 'testD1')).to.be.true;

      expect(mockTestLib.describe.skip.calledWithMatch('Test Suite E - skipped')).to.be.true;
      expect(mockTestLib.it.calledWith('Test Suite E - test 1', 'testE1')).to.be.true;

      expect(mockTestLib.describe.calledWithMatch('Test Suite F - hooks')).to.be.true;
      expect(mockTestLib.it.calledWith('Test Suite F - test 1', 'testF1')).to.be.true;
      expect(mockTestLib.before.calledWith('f-before')).to.be.true;
      expect(mockTestLib.beforeEach.calledWith('f-beforeEach')).to.be.true;
      expect(mockTestLib.after.calledWith('f-after')).to.be.true;
      expect(mockTestLib.afterEach.calledWith('f-afterEach')).to.be.true;

      expect(mockTestLib.describe.calledWithMatch('Test Suite G - hooks[]')).to.be.true;
      expect(mockTestLib.it.calledWith('Test Suite G - test 1', 'testG1')).to.be.true;
      expect(mockTestLib.before.calledWith('g-before-1')).to.be.true;
      expect(mockTestLib.before.calledWith('g-before-2')).to.be.true;
      expect(mockTestLib.beforeEach.calledWith('g-beforeEach-1')).to.be.true;
      expect(mockTestLib.beforeEach.calledWith('g-beforeEach-2')).to.be.true;
      expect(mockTestLib.after.calledWith('g-after-1')).to.be.true;
      expect(mockTestLib.after.calledWith('g-after-2')).to.be.true;
      expect(mockTestLib.afterEach.calledWith('g-afterEach-1')).to.be.true;
      expect(mockTestLib.afterEach.calledWith('g-afterEach-2')).to.be.true;
    });

  });

});
