import {getJasmineApi} from './jasmine';
import {getJestApi} from './jest';
import {getMochaApi} from './mocha';

export const api = {
  get jasmine() {
    return getJasmineApi();
  },
  get jest() {
    return getJestApi();
  },
  get mocha() {
    return getMochaApi();
  }
};
