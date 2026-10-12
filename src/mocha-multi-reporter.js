'use strict';

const { reporters } = require('mocha');

/**
 * Runs mocha's built-in `spec` and `xunit` reporters side by side against the same runner, so a
 * test run gets both live console output and a JUnit-style XML file.
 * Both are bundled with mocha itself.
 */
module.exports = class MultiReporter {
	constructor(runner, options) {
		new reporters.Spec(runner, options);
		new reporters.XUnit(runner, options);
	}
};
