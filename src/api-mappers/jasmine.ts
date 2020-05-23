import {IApiMapper} from '../models';

export function getJasmineApi(): IApiMapper {
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
