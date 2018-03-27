'use strict';

const TestSuite = require('./TestSuite');

class TestRunner {

  static run(testSuiteDefinition = {}) {
    TestSuite.generate(testSuiteDefinition)
      .forEach(testSuite => testSuite.run());
  }

}

module.exports = TestRunner;
