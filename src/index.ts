import {IApiMapper, ITestConfig} from './models';
import {TestRunner, TestSuiteDefinition} from './test-runner';

export {api} from './api-mappers';
export {ITestConfig, IApiMapper} from './models';
export {TestSuiteDefinition} from './test-runner';

export function run(testSuiteDefinition: TestSuiteDefinition, config: ITestConfig) {
  new TestRunner(testSuiteDefinition, config).run();
}
