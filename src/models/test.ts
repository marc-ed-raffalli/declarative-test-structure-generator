import {IBaseDefinition} from './shared';
import {itFn} from './test-config';

export interface ITest extends IBaseDefinition {
  test: itFn;
}
