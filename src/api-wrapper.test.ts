import {ApiWrapper} from './api-wrapper';
import {IApiMapper} from './models';

export function buildApiMapperMock() {
  return {
    describe: jest.fn(),
    before: jest.fn(),
    beforeEach: jest.fn(),
    after: jest.fn(),
    afterEach: jest.fn(),
    it: jest.fn(),
    only: {
      describe: jest.fn(),
      it: jest.fn()
    },
    skip: {
      describe: jest.fn(),
      it: jest.fn()
    }
  };
}

describe('ApiWrapper', () => {

  let
    wrapper: ApiWrapper,
    apiMapperMocks: IApiMapper,
    fn: jest.Mock;

  beforeEach(() => {
    apiMapperMocks = buildApiMapperMock();

    wrapper = new ApiWrapper(apiMapperMocks);
    fn = jest.fn();
  });

  describe('hooks', () => {

    it('before', () => {
      wrapper.before(fn);

      expect(apiMapperMocks.before).toHaveBeenCalledWith(fn);
      expect(fn).not.toHaveBeenCalled();
    });

    it('beforeEach', () => {
      wrapper.beforeEach(fn);

      expect(apiMapperMocks.beforeEach).toHaveBeenCalledWith(fn);
      expect(fn).not.toHaveBeenCalled();
    });

    it('after', () => {
      wrapper.after(fn);

      expect(apiMapperMocks.after).toHaveBeenCalledWith(fn);
      expect(fn).not.toHaveBeenCalled();
    });

    it('afterEach', () => {
      wrapper.afterEach(fn);

      expect(apiMapperMocks.afterEach).toHaveBeenCalledWith(fn);
      expect(fn).not.toHaveBeenCalled();
    });

  });

  describe('describe', () => {

    const name = 'foo suite';

    it('describe', () => {
      wrapper.describe({name}, fn);

      expect(apiMapperMocks.describe).toHaveBeenCalledWith(name, fn);
      expect(apiMapperMocks.only.describe).not.toHaveBeenCalled();
      expect(apiMapperMocks.skip.describe).not.toHaveBeenCalled();
      expect(fn).not.toHaveBeenCalled();
    });

    it('describe.only', () => {
      wrapper.describe({name, only: true}, fn);

      expect(apiMapperMocks.describe).not.toHaveBeenCalled();
      expect(apiMapperMocks.only.describe).toHaveBeenCalledWith(name, fn);
      expect(apiMapperMocks.skip.describe).not.toHaveBeenCalled();
      expect(fn).not.toHaveBeenCalled();
    });

    it('describe.skip', () => {
      wrapper.describe({name, skip: true}, fn);

      expect(apiMapperMocks.describe).not.toHaveBeenCalled();
      expect(apiMapperMocks.only.describe).not.toHaveBeenCalled();
      expect(apiMapperMocks.skip.describe).toHaveBeenCalledWith(name, fn);
      expect(fn).not.toHaveBeenCalled();
    });

  });

  describe('it', () => {

    const name = 'foo test';

    it('it', () => {
      wrapper.it({name}, fn);

      expect(apiMapperMocks.it).toHaveBeenCalledWith(name, fn);
      expect(apiMapperMocks.only.it).not.toHaveBeenCalled();
      expect(apiMapperMocks.skip.it).not.toHaveBeenCalled();
      expect(fn).not.toHaveBeenCalled();
    });

    it('it.only', () => {
      wrapper.it({name, only: true}, fn);

      expect(apiMapperMocks.it).not.toHaveBeenCalled();
      expect(apiMapperMocks.only.it).toHaveBeenCalledWith(name, fn);
      expect(apiMapperMocks.skip.it).not.toHaveBeenCalled();
      expect(fn).not.toHaveBeenCalled();
    });

    it('it.skip', () => {
      wrapper.it({name, skip: true}, fn);

      expect(apiMapperMocks.it).not.toHaveBeenCalled();
      expect(apiMapperMocks.only.it).not.toHaveBeenCalled();
      expect(apiMapperMocks.skip.it).toHaveBeenCalledWith(name, fn);
      expect(fn).not.toHaveBeenCalled();
    });

  });

});
