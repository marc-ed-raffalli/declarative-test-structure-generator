import {IApiMapper} from '../models';

export function getJestApi(): IApiMapper {
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
