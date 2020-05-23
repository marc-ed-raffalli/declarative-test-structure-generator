# declarative-test-structure-generator

[![Build Status](https://travis-ci.org/marc-ed-raffalli/declarative-test-structure-generator.svg?branch=master)](https://travis-ci.org/marc-ed-raffalli/declarative-test-structure-generator)
[![Coverage Status](https://coveralls.io/repos/github/marc-ed-raffalli/declarative-test-structure-generator/badge.svg?branch=master)](https://coveralls.io/github/marc-ed-raffalli/declarative-test-structure-generator?branch=master)
[![NPM version](https://img.shields.io/npm/v/declarative-test-structure-generator.svg)](https://www.npmjs.com/package/declarative-test-structure-generator)

`declarative-test-structure-generator` allows writing tests in an object definition style.

```js
{
  'Object syntax': {
    tests: {
      'sample test 1': {
        test: () => {
          expect(1 + 2).toEqual(3);
        }
      },
      'skipped test': {
        skip: true,
        test: () => {
          expect(5 + 8).toEqual(13);
        }
      }
    }
  }
}
```

As of version 1, the API has been refactored to be standalone, it no longer packs any specific test framework.
The API needs to be mapped using pre-built or custom mappers (see [documentation][projectPage]).

## Installation

```bash
npm install -D declarative-test-structure-generator

# or
yarn add -D declarative-test-structure-generator
```

## TypeScript

As of version 1, the library package has been re-written in typescript and provides the type definitions.

## Documentation

The documentation is available on the [project's page][projectPage]

## Issues

Please share your feedback and report the encountered issues on the [project's issues page][projectIssues].


[projectPage]: https://marc-ed-raffalli.github.io/en/projects/declarative-test-structure-generator
[projectIssues]: https://github.com/marc-ed-raffalli/declarative-test-structure-generator/issues
