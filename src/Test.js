'use strict';

const TestBlock = require('./TestBlock');

class Test extends TestBlock {

  constructor(definition = {}, config) {
    super(definition, config);
  }

  static generate(def = {}, config) {
    return Object.keys(def)
      .map(key => new Test(def[key], config));
  }

  getRunTestBlock() {
    return TestBlock.getTestLib().it;
  }

  getRunOnlyTestBlock() {
    return TestBlock.getTestLib().it.only;
  }

  getSkipTestBlock() {
    return TestBlock.getTestLib().it.skip;
  }

  run() {
    return this.definition.test;
  }

}

module.exports = Test;
