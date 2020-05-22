import {fnType} from './shared';
import {ITestSuiteHooks} from './test-suite';

export type itFn = fnType | fnType<Promise<any>> | ((done: fnType) => void);
export type hookType = fnType | fnType<Promise<any>> | ((done: fnType) => void);

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
