# @axway/gulp-tasks

Common gulp tasks and utilities.

Visit https://github.com/appcelerator/axway-gulp-tasks for more information.

Report issues to [GitHub issues][2].

## Prerequisites

@axway/gulp-tasks requires you to globally install [gulp](https://npmjs.org/package/gulp) 4.x:

	[sudo] npm i -g gulp

## Installation

	npm i @axway/gulp-tasks --save-dev

## Usage

Create a file in the root of your project called `gulpfile.js`:

```js
'use strict';

require('@axway/gulp-tasks')({
	gulp:     require('gulp'),
	pkgJson:  require('./package.json'),
	template: 'standard',
	babel:    'node12'
});
```

You can specify the Node.js version you wish to transpile down to. Possibly values are `node12` and
`node14`.

## Gulp Tasks

Completely deletes all generated folders or a specific type:

	$ gulp clean
	$ gulp clean-coverage
	$ gulp clean-dist
	$ gulp clean-docs

Run [eslint](https://eslint.org/) against your source code and tests.

	$ gulp lint
	$ gulp lint-src
	$ gulp lint-test

Invoke [Babel](https://babeljs.io/) and transpile your code into the `dist` directory.

	$ gulp build

Build and run unit tests using [Mocha](https://mochajs.org/).

	$ gulp test

Build and run unit tests with coverage reports using [Mocha](https://mochajs.org/) and
[nyc](https://www.npmjs.com/package/nyc).

	$ gulp coverage

Watch source files for changes to trigger a re-build.

	$ gulp watch

Watch source and test files for changes to trigger a re-build and run tests.

	$ gulp watch-test

## Legal

This project is open source under the [Apache Public License v2][1] and is developed by
[Axway, Inc](http://www.axway.com/) and the community. Please read the [`LICENSE`][1] file included
in this distribution for more information.

[1]: https://github.com/appcelerator/axway-gulp-tasks/blob/master/LICENSE
[2]: https://github.com/appcelerator/axway-gulp-tasks/issues
