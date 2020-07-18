import {ApiWrapper} from './api-wrapper';
import {TestBlock} from './test-block';

describe('TestBlock', () => {

  let
    apiWrapperMock: ApiWrapper,
    fn: jest.Mock;

  beforeEach(() => {
    apiWrapperMock = {
      before: jest.fn(),
      beforeEach: jest.fn(),
      after: jest.fn(),
      afterEach: jest.fn(),
      describe: jest.fn(),
      it: jest.fn()
    } as unknown as ApiWrapper;
    fn = jest.fn();
  });

  describe('run', () => {
    const name = 'foo test';

    it('calls api wrapper with definition', () => {
      const def = {name, test: fn};

      new TestBlock(apiWrapperMock, def).run({});

      expect(apiWrapperMock.it).toHaveBeenCalledWith(def, expect.any(Function));
      expect(fn).not.toHaveBeenCalled();
    });

  });

});
