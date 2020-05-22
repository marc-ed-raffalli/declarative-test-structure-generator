import {fnType, hookType, IApiMapper, IBaseDefinition, itFn, IWithName} from './models';

export class ApiWrapper {

  constructor(private api: IApiMapper) {
  }

  before(hookFn: hookType) {
    this.api.before(hookFn);
  }

  beforeEach(hookFn: hookType) {
    this.api.beforeEach(hookFn);
  }

  after(hookFn: hookType) {
    this.api.after(hookFn);
  }

  afterEach(hookFn: hookType) {
    this.api.afterEach(hookFn);
  }

  describe({name, only, skip}: IBaseDefinition & IWithName, suiteFn: fnType) {
    if (only) {
      this.api.only.describe(name, suiteFn);
      return;
    }
    if (skip) {
      this.api.skip.describe(name, suiteFn);
      return;
    }

    this.api.describe(name, suiteFn);
  }

  it({name, only, skip}: IBaseDefinition & IWithName, testFn: itFn) {
    if (only) {
      this.api.only.it(name, testFn);
      return;
    }
    if (skip) {
      this.api.skip.it(name, testFn);
      return;
    }

    this.api.it(name, testFn);
  }

}
