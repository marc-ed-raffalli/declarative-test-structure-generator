'use strict';

const TestRunner = require('./src/TestRunner');

module.exports = (testSuiteDefinition, config) => {
  TestRunner.run(testSuiteDefinition, config);
};
