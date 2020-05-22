import {buildApiMapperMock} from './api-wrapper.test';
import {IApiMapper} from './models';
import {TestRunner} from './test-runner';

describe('Test runner', () => {

  let apiMapper: IApiMapper;

  beforeEach(() => {
    apiMapper = buildApiMapperMock();
  });

  describe('initialization', () => {

    it('creates test suites from array', () => {
      const testSuiteDefinition = [
        {
          name: 'Test suite Foo',
          tests: [{name: 'Foo test', test: jest.fn()}]
        },
        {
          name: 'Test suite Bar',
          tests: [{name: 'Bar test', test: jest.fn()}]
        }
      ];

      const testRunner = new TestRunner(testSuiteDefinition, {api: apiMapper});

      expect(testRunner.testSuites[0].getProps().name).toEqual('Test suite Foo');
      expect(testRunner.testSuites[1].getProps().name).toEqual('Test suite Bar');
      expect(testRunner.testSuites.length).toEqual(2);

      expect(testSuiteDefinition[0].tests[0].test).not.toBeCalled();
    });

    it('creates test suites from object', () => {
      const testSuiteDefinition = {
        'Test suite Foo': {
          tests: [{name: 'Foo test', test: jest.fn()}]
        },
        'Test suite Bar': {
          tests: [{name: 'Bar test', test: jest.fn()}]
        }
      };

      const testRunner = new TestRunner(testSuiteDefinition, {api: apiMapper});

      expect(testRunner.testSuites[0].getProps().name).toEqual('Test suite Foo');
      expect(testRunner.testSuites[1].getProps().name).toEqual('Test suite Bar');
      expect(testRunner.testSuites.length).toEqual(2);

      expect(testSuiteDefinition['Test suite Foo'].tests[0].test).not.toBeCalled();
      expect(testSuiteDefinition['Test suite Bar'].tests[0].test).not.toBeCalled();
    });

  });

  describe('run', () => {

    it('run all test suites', () => {
      const testRunner = new TestRunner([], {api: apiMapper});
      // @ts-ignore
      testRunner.testSuites = [{run: jest.fn()}, {run: jest.fn()}];

      testRunner.run();

      testRunner.testSuites.forEach(def => {
        expect(def.run).toHaveBeenCalled();
      });
    });

  });

});
