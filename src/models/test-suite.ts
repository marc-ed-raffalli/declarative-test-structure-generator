import {IBaseDefinition, IWithName} from './shared';
import {ITest} from './test';
import {hookType} from './test-config';

type hookDefinitionType = hookType | hookType[];
type arrayWithNameOrObject<T> = Array<T & IWithName> | { [k: string]: T };

export interface ITestSuiteHooks {
  before: hookDefinitionType;
  beforeEach: hookDefinitionType;
  after: hookDefinitionType;
  afterEach: hookDefinitionType;
}

export interface ITestSuite extends IBaseDefinition, Partial<ITestSuiteHooks> {
  tests: arrayWithNameOrObject<ITest | ITestSuite>;
}
