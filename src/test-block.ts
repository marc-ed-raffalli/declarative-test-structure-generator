import {ApiWrapper} from './api-wrapper';
import {ITest, IWithName} from './models';

export class TestBlock {

  constructor(protected api: ApiWrapper, protected props: ITest & IWithName) {
  }

  public run() {
    this.api.it(this.props, this.props.test);
  }

  public getProps() {
    return this.props;
  }

}
