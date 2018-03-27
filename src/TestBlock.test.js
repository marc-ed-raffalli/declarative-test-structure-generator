'use strict';

const expect = require('chai').expect,
  sinon = require('sinon');

const TestBlock = require('./TestBlock');

describe('TestBlock', () => {

  let testBlock;

  describe('constructor', () => {

    it('defaults to skip=false, only=false', () => {
      testBlock = new TestBlock();

      expect(testBlock.only).to.be.false;
      expect(testBlock.skip).to.be.false;
    });

    it('sets `only`', () => {
      testBlock = new TestBlock({only: true});

      expect(testBlock.only).to.be.true;
    });

    it('sets `skip`', () => {
      testBlock = new TestBlock({skip: true});

      expect(testBlock.skip).to.be.true;
    });

  });

  describe('methods', () => {

    describe('implemented by sub-class', () => {

      function testThrow(name) {
        it(`${name} throws to force overriding`, () => {
          expect(() => new TestBlock()[name]()).to.throw();
        });
      }

      testThrow('getRunTestBlock');
      testThrow('getRunOnlyTestBlock');
      testThrow('getSkipTestBlock');
      testThrow('run');

    });

    describe('build', () => {

      let testSpy,
        testOnlySpy,
        testSkipSpy,
        testSuitBodyStub;

      beforeEach(() => {
        testSpy = sinon.spy();
        testOnlySpy = sinon.spy();
        testSkipSpy = sinon.spy();

        testSpy.only = testOnlySpy;
        testSpy.skip = testSkipSpy;

        sinon.stub(TestBlock.prototype, 'getRunTestBlock').returns(testSpy);
        sinon.stub(TestBlock.prototype, 'getRunOnlyTestBlock').returns(testOnlySpy);
        sinon.stub(TestBlock.prototype, 'getSkipTestBlock').returns(testSkipSpy);

        testSuitBodyStub = 'testSuitBodyStub';
        sinon.stub(TestBlock.prototype, 'run').returns(testSuitBodyStub);
      });

      afterEach(() => {
        TestBlock.prototype.getRunTestBlock.restore();
        TestBlock.prototype.getRunOnlyTestBlock.restore();
        TestBlock.prototype.getSkipTestBlock.restore();
        TestBlock.prototype.run.restore();
      });

      it('calls getRunTestBlock', () => {
        testBlock = new TestBlock({name: 'foo'});
        testBlock.build();

        expect(testSpy.calledOnce).to.be.true;
        expect(testSpy.calledWith('foo', testSuitBodyStub)).to.be.true;
        expect(testBlock.run.calledOnce).to.be.true;

        expect(testOnlySpy.called).to.be.false;
        expect(testSkipSpy.called).to.be.false;
      });

      it('calls getSkipTestBlock', () => {
        testBlock = new TestBlock({name: 'foo', skip: true});
        testBlock.build();

        expect(testSkipSpy.calledOnce).to.be.true;
        expect(testSkipSpy.calledWith('foo', testSuitBodyStub)).to.be.true;

        expect(testSpy.called).to.be.false;
        expect(testOnlySpy.called).to.be.false;
      });

      it('calls getRunOnlyTestBlock', () => {
        testBlock = new TestBlock({name: 'foo', only: true});
        testBlock.build();

        expect(testOnlySpy.calledOnce).to.be.true;
        expect(testOnlySpy.calledWith('foo', testSuitBodyStub)).to.be.true;

        expect(testSpy.called).to.be.false;
        expect(testSkipSpy.called).to.be.false;
      });

    });

  });

});
