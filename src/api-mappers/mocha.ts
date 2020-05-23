import {IApiMapper} from '../models';

import './shared';

export function getMochaApi(): IApiMapper {
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
