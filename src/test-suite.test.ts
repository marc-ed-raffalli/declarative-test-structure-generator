import {ApiWrapper} from './api-wrapper';
import {fnType, ITestSuite, ITestSuiteHooks, IWithName} from './models';
import {TestSuite} from './test-suite';

describe('TestSuite', () => {

  const hooks: Array<keyof ITestSuiteHooks> = [
    'before', 'beforeEach',
    'after', 'afterEach'
  ];

  let
    apiWrapperMock: ApiWrapper,
    testSuiteProps: ITestSuite & IWithName
  ;

  beforeEach(() => {
    const
      callFn = function (fn: fnType) {
        // @ts-ignore
        fn.call(this);
      },
      callNameFn = function (name: string, fn: fnType) {
        // @ts-ignore
        fn.call(this);
      }
    ;
    apiWrapperMock = {
      before: jest.fn().mockImplementation(callFn),
      beforeEach: jest.fn().mockImplementation(callFn),
      after: jest.fn().mockImplementation(callFn),
      afterEach: jest.fn().mockImplementation(callFn),
      describe: jest.fn().mockImplementation(callNameFn),
      it: jest.fn().mockImplementation(callNameFn)
    } as unknown as ApiWrapper;
    testSuiteProps = {
      name: 'Test suite',
      tests: [
        {name: 'Foo test', test: jest.fn()},
        {name: 'Bar test', test: jest.fn()}
      ]
    };
  });

  describe('initialization', () => {

    it('creates tests from array', () => {
      const testSuite = new TestSuite(apiWrapperMock, testSuiteProps);

      expect(testSuite.tests[0].getProps().name).toEqual('Foo test');
      expect(testSuite.tests[1].getProps().name).toEqual('Bar test');
      expect(testSuite.tests.length).toEqual(2);
    });

    it('creates tests from object', () => {
      testSuiteProps.tests = {
        'Foo test': {test: jest.fn()},
        'Bar test': {test: jest.fn()}
      };

      const testSuite = new TestSuite(apiWrapperMock, testSuiteProps);

      expect(testSuite.tests[0].getProps().name).toEqual('Foo test');
      expect(testSuite.tests[1].getProps().name).toEqual('Bar test');
      expect(testSuite.tests.length).toEqual(2);
    });

    it('supports nested test suites', () => {
      testSuiteProps.tests = {
        'Foo test': {
          tests: {
            'Foo test nested': {test: jest.fn()}
          }
        },
        'Bar test': {test: jest.fn()}
      };

      const testSuite = new TestSuite(apiWrapperMock, testSuiteProps);

      expect(testSuite.tests[0].getProps().name).toEqual('Foo test');
      expect(testSuite.tests[1].getProps().name).toEqual('Bar test');
      expect(testSuite.tests.length).toEqual(2);
    });

  });

  describe('run', () => {

    function assertApiCalledWith(key: keyof ApiWrapper, args: any): void {
      if (Array.isArray(args)) {
        return args.forEach(arg => assertApiCalledWith(key, arg));
      }

      expect(apiWrapperMock[key]).toHaveBeenCalledWith(args);
    }

    it('calls api wrapper with hooks', () => {
      testSuiteProps.before = jest.fn();
      testSuiteProps.beforeEach = jest.fn();
      testSuiteProps.after = jest.fn();
      testSuiteProps.afterEach = jest.fn();

      new TestSuite(apiWrapperMock, testSuiteProps).run();

      hooks.forEach((key) => assertApiCalledWith(key, testSuiteProps[key]));
    });

    it('calls api wrapper with hooks array', () => {
      testSuiteProps.before = [jest.fn(), jest.fn()];
      testSuiteProps.beforeEach = [jest.fn(), jest.fn()];
      testSuiteProps.after = [jest.fn(), jest.fn()];
      testSuiteProps.afterEach = [jest.fn(), jest.fn()];

      new TestSuite(apiWrapperMock, testSuiteProps).run();

      hooks.forEach((key) => assertApiCalledWith(key, testSuiteProps[key]));
    });

    it('supports setting context in hooks', () => {
      testSuiteProps = {
        ...testSuiteProps,
        before() {
          // @ts-ignore
          this.foo = 'foo';
        },
        beforeEach() {
          // @ts-ignore
          this.bar = 'bar';
        },
        tests: [{
          name: 'Foo test',
          test() {
            expect(this).toMatchObject({foo: 'foo', bar: 'bar'});
          }
        }]
      };

      new TestSuite(apiWrapperMock, testSuiteProps).run();
    });

    it('calls api wrapper with definition', () => {
      new TestSuite(apiWrapperMock, testSuiteProps).run();

      expect(apiWrapperMock.describe).toHaveBeenCalledWith(testSuiteProps, expect.any(Function));
    });

  });

});
