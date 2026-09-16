'use strict';

module.exports = [
	...require('eslint-config-axway/env-node'),
	{
		rules: {
			'n/no-unsupported-features/es-syntax': 'off',
			'n/no-unsupported-features/node-builtins': [ 'warn', { version: '>=18.19.0' } ],
			'require-atomic-updates': 'off'
		}
	}
];
