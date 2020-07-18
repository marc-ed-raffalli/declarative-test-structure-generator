import {ApiWrapper} from './api-wrapper';
import {hookType, ITest, ITestSuite, ITestSuiteHooks, IWithName} from './models';
import {TestBlock} from './test-block';

function arrayify(d: any) {
  if (!d) return [];
  return Array.isArray(d) ? d : [d];
}

export class TestSuite {

  hooks: { [k in keyof ITestSuiteHooks]: hookType[] };
  tests: Array<TestSuite | TestBlock>;

  constructor(protected api: ApiWrapper, protected props: ITestSuite & IWithName) {
    const
      tests: Array<(ITest | ITestSuite) & IWithName> = Array.isArray(props.tests)
        ? props.tests
        : Object.entries(props.tests)
          .map(([testName, def]) => ({
            ...def,
            name: testName
          }))
    ;

    this.tests = tests.map((def) => ('test' in def)
      ? new TestBlock(api, def as ITest & IWithName)
      : new TestSuite(api, def as ITestSuite & IWithName)
    );
    this.hooks = {
      before: arrayify(props.before),
      beforeEach: arrayify(props.beforeEach),
      after: arrayify(props.after),
      afterEach: arrayify(props.afterEach)
    };
  }

  public getProps() {
    return this.props;
  }

  public run(context: any) {
    // tslint:disable-next-line:no-this-assignment
    const {api, props, tests, hooks} = this;

    api.describe(props, () => {
      Object.entries(hooks)
        .forEach(
          ([hookName, hookFnList]) => hookFnList
            .forEach((hook) => api[hookName as keyof ITestSuiteHooks](hook.bind(context)))
        );

      tests.forEach(test => test.run(context));
    });
  }

}
