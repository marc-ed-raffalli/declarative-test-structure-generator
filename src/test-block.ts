import {ApiWrapper} from './api-wrapper';
import {ITest, IWithName} from './models';

export class TestBlock {

  constructor(protected api: ApiWrapper, protected props: ITest & IWithName) {
  }

  public getProps() {
    return this.props;
  }

  public run(context: any) {
    this.api.it(this.props, this.props.test.bind(context));
  }

}
