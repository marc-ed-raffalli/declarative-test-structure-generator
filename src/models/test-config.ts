import {fnType} from './shared';
import {ITestSuiteHooks} from './test-suite';

type doneOrPromiseType = (() => void) | ((done: fnType) => void) | fnType<Promise<any>>;

export type itFn = doneOrPromiseType;
export type hookType = doneOrPromiseType;

type describeType = (name: string, test: fnType) => void;
type itType = (name: string, test: itFn) => void;

type hooks = { [k in keyof ITestSuiteHooks]: (hookFn: hookType) => void };

export interface IApiMapper extends hooks {
  describe: describeType;
  it: itType;
  only: {
    describe: describeType;
    it: itType;
  };
  skip: {
    describe: describeType;
    it: itType;
  };
}

export interface ITestConfig {
  api: IApiMapper;
}
