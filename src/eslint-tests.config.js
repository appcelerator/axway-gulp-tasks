'use strict';

module.exports = [
	...require('eslint-config-axway/env-node').default,
	...require('eslint-config-axway/+chai').default,
	...require('eslint-config-axway/+mocha').default,
	{
		languageOptions: {
			globals: {
				spy: 'readonly',
				stub: 'readonly',
				sinon: 'readonly'
			}
		},
		rules: {
			'n/no-unsupported-features/es-syntax': 'off',
			'promise/always-return': 'off',
			'require-atomic-updates': 'off'
		}
	}
];
