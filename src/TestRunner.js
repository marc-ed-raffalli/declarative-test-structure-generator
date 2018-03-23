'use strict';

const TestSuite = require('./TestSuite'),
  TestConfig = require('./TestConfig');

class TestRunner {

  static run(testSuiteDefinition = {}, config) {
    config = TestConfig.make(config);

    TestSuite.generate(testSuiteDefinition, config)
      .forEach(testSuite => testSuite.run());
  }

}

module.exports = TestRunner;
