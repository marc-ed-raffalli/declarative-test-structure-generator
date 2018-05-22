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


## Installation

```bash
npm install --save-dev declarative-test-structure-generator

# or
npm i -D declarative-test-structure-generator
```


## Documentation

The documentation is available on the [project's page][projectPage] 

## Issues

Please share your feedback and report the encountered issues on the [project's issues page][projectIssues].


[projectPage]: https://marc-ed-raffalli.github.io/en/projects/declarative-test-structure-generator
[projectIssues]: https://github.com/marc-ed-raffalli/declarative-test-structure-generator/issues

[mocha]: https://mochajs.org/
