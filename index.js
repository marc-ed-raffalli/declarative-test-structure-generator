'use strict';

const TestRunner = require('./src/TestRunner');

module.exports = {
  run: testSuiteDefinition => {
    TestRunner.run(testSuiteDefinition);
  }
};
