import {ApiWrapper} from './api-wrapper';
import {ITestConfig, ITestSuite, IWithName} from './models';
import {TestSuite} from './test-suite';

export type TestSuiteDefinition = Array<ITestSuite & IWithName> | { [k: string]: ITestSuite };

export class TestRunner {

  apiWrapper: ApiWrapper;
  testSuites: TestSuite[];

  constructor(testSuiteDefinition: TestSuiteDefinition, config: ITestConfig) {
    const
      testSuiteDefinitionArr = Array.isArray(testSuiteDefinition)
        ? testSuiteDefinition
        : Object.entries(testSuiteDefinition).map(([name, def]) => ({...def, name}));

    this.apiWrapper = new ApiWrapper(config.api);
    this.testSuites = testSuiteDefinitionArr
      .map((def) => new TestSuite(this.apiWrapper, def));
  }

  run() {
    this.testSuites.forEach((def) => def.run({}));
  }
}
