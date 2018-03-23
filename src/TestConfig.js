'use strict';

class TestConfig {

  constructor(config = {}) {
    this._config = config;
  }

  get config() {
    return this._config;
  }

  static make(config) {
    return new TestConfig(config);
  }

}

module.exports = TestConfig;
