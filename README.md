# declarative-test-structure-generator

[![Build Status](https://travis-ci.org/marc-ed-raffalli/declarative-test-structure-generator.svg?branch=master)](https://travis-ci.org/marc-ed-raffalli/declarative-test-structure-generator)
[![Coverage Status](https://coveralls.io/repos/github/marc-ed-raffalli/declarative-test-structure-generator/badge.svg?branch=master)](https://coveralls.io/github/marc-ed-raffalli/declarative-test-structure-generator?branch=master)
[![NPM version](https://img.shields.io/npm/v/declarative-test-structure-generator.svg)](https://www.npmjs.com/package/declarative-test-structure-generator)

`declarative-test-structure-generator` allows to write tests in an object definition style.  

```js
{
  name: 'admin CAN create',
  test: () => { /* test code here */ }
}
```

It uses [Mocha][mocha] and exposes its BDD API.

## Motivations

The main motivation for this package was to reuse the test generation mechanism in other projects
but also to avoid duplication of the documentation.

## Disclaimer

This package **is not a replacement** for [Mocha][mocha], just a way to reuse code and documentation.

## Usage

### Installation

```bash
npm install --save-dev declarative-test-structure-generator

# or
npm i -D declarative-test-structure-generator
```

### Basics

```js
const testGen = require('declarative-test-structure-generator');

testGen({
  'Read access': {
    tests: [
      {
        name: 'should do something',
        test: () => {
          expect(1 + 1).to.equal(2);
        }
      },
      {
        name: 'something should be done',
        test: done => {
          waitForSomething(done);
        }
      },
      {
        name: 'waiting for a promise to be kept',
        test: () => waitForAPromise()
      }
    ]
  }
});
```

The code should be very self explanatory.   
Read the [test suite definition](#test-suite-definition) and the [test definition](#test-definition) for additional API.

### Definitions

#### Test suite definition

The test suite definition accepts the following:

```
{
  skip:       {boolean}
  only:       {boolean}
  before:     {function|Array[function]}
  beforeEach: {function|Array[function]}
  after:      {function|Array[function]}
  afterEach:  {function|Array[function]}
  tests:      {Array[TestDefinition]|Object<string, TestSuiteDefinition>}
}
```

`tests` accepts either an object or an array of [test definitions](#test-definition), 
see [Test suites definition structure](#test-suites-definition-structure) for more details.

**TIP:** It exposes the [Mocha][mocha] API through `skip`, `only`, `before`, `beforeEach`, `after`, `afterEach`,
see [run only / skip](#run-only-/-skip), [test hooks](#test-hooks) for more details.

#### Test definition

The test definition accepts the following:

```
{
  name:       {string}
  skip:       {boolean}
  only:       {boolean}
  test:       {function}
}
```

**TIP:** It exposes the [Mocha][mocha] API through `skip`, `only`,
see [run only / skip](#run-only-/-skip) for more details.

## Advanced usage

### Test suites definition structure

The test suite definition allows for nested structure:

```js
testGen(server, {
  'Root level': {
    'Test suite lvl 1': {
      tests: [{
        // test definition
      }]
    },
    'Test suite lvl 2': {
      tests: {
        'Test suite lvl 2.0': {
          tests: {
            'Test suite lvl 2.0.0': {
              tests: [{
                // test definition
              }]
            }
          }
        }
      }
    }
  }
});
```

The test suite name is the `key` value associated to its object definition.

`tests` accepts:
- `Array`: defines a list of [test definitions](#test-definition)
- `Object`: defines a map of [test suites definitions](#test-suite-definition)

### Test hooks

It is possible to run one or many function at different phase of the test.
The [Mocha hooks API](https://mochajs.org/#hooks) is exposed and you can run any of the `before`, `beforeEach`, `after`, `afterEach`.

If you need to define many hooks of the same type, simply use an array of functions.
Each hook is called in the specified order. 

[Mocha: Asynchronous hooks](https://mochajs.org/#asynchronous-hooks)

### Run only / skip

`declarative-test-structure-generator` exposes the [Mocha][mocha] `skip` and `only` in the definition.

It is possible to run only one test (or test suite) by defining `only: true`.
Similarly skip a test (or test suite) with `skip: true`.

See usage in the [test suite definition](#test-suite-definition) / [test definition](#test-definition).

- [Mocha skip](https://mochajs.org/#inclusive-tests)
- [Mocha only](https://mochajs.org/#exclusive-tests)

### View the test logging data

`declarative-test-structure-generator` uses [debug][debug] to log information during the tests.

You can view these logs by setting the `DEBUG` env variable to `declarative-test-structure-generator`.

```bash
DEBUG=declarative-test-structure-generator npm test
```

[debug]: https://www.npmjs.com/package/debug
[mocha]: https://mochajs.org/
