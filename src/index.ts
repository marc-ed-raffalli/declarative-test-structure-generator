import {IApiMapper, ITestConfig} from './models';
import {TestRunner, TestSuiteDefinition} from './test-runner';

export {ITestConfig, IApiMapper} from './models';
export {TestSuiteDefinition} from './test-runner';

export function run(testSuiteDefinition: TestSuiteDefinition, config: ITestConfig) {
  new TestRunner(testSuiteDefinition, config).run();
}

export const
  api = {
    get jasmine() {
      return getJasmineApi();
    },
    get jest() {
      return getJestApi();
    },
    get mocha() {
      return getMochaApi();
    }
  }
;

declare function before(hook: any): void;

declare function after(hook: any): void;

function getJasmineApi(): IApiMapper {
  return {
    describe,
    it,
    before: beforeAll,
    beforeEach,
    after: afterAll,
    afterEach,
    only: {
      describe: fdescribe,
      it: fit
    },
    skip: {
      describe: xdescribe,
      it: xit
    }
  };
}

function getJestApi(): IApiMapper {
  return {
    describe,
    it,
    before: beforeAll,
    beforeEach,
    after: afterAll,
    afterEach,
    only: {
      describe: describe.only,
      it: it.only
    },
    skip: {
      describe: describe.skip,
      it: it.skip
    }
  };
}

function getMochaApi(): IApiMapper {
  return {
    describe,
    it,
    before,
    beforeEach,
    after,
    afterEach,
    only: {
      describe: describe.only,
      it: it.only
    },
    skip: {
      describe: describe.skip,
      it: it.skip
    }
  };
}
