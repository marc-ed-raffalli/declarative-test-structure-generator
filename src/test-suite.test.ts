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
      callFn = function (this: any, fn: fnType) {
        fn.call(this);
      },
      callNameFn = function (this: any, name: string, fn: fnType) {
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

      new TestSuite(apiWrapperMock, testSuiteProps).run({});

      // callback bound to context, cannot do equality
      hooks.forEach((key) => assertApiCalledWith(key, expect.any(Function)));
    });

    it('calls api wrapper with hooks array', () => {
      testSuiteProps.before = [jest.fn(), jest.fn()];
      testSuiteProps.beforeEach = [jest.fn(), jest.fn()];
      testSuiteProps.after = [jest.fn(), jest.fn()];
      testSuiteProps.afterEach = [jest.fn(), jest.fn()];

      new TestSuite(apiWrapperMock, testSuiteProps).run({});

      // callback bound to context, cannot do equality
      hooks.forEach((key) => assertApiCalledWith(key, expect.any(Function)));
    });

    it('supports setting context in hooks', () => {
      let checks = 0;
      testSuiteProps = {
        ...testSuiteProps,
        before(this: any) {
          this.foo = 'foo';
          checks++;
        },
        beforeEach(this: any) {
          this.bar = 'bar';
          checks++;
        },
        tests: [{
          name: 'Foo test',
          test() {
            expect(this).toMatchObject({foo: 'foo', bar: 'bar'});
            checks++;
          }
        }]
      };

      new TestSuite(apiWrapperMock, testSuiteProps).run({});
      expect(checks).toEqual(3);
    });

    it('calls api wrapper with definition', () => {
      new TestSuite(apiWrapperMock, testSuiteProps).run({});

      expect(apiWrapperMock.describe).toHaveBeenCalledWith(testSuiteProps, expect.any(Function));
    });

  });

});
