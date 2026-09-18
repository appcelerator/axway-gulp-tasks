'use strict';

module.exports = [
	...require('eslint-config-axway/env-node'),
	...require('eslint-config-axway/+chai'),
	...require('eslint-config-axway/+mocha'),
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
