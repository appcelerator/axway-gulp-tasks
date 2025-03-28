const ansiColors    = require('ansi-colors');
const fs            = require('fs-extra');
const log           = require('fancy-log');
const path          = require('path');
const { execSync } = require('child_process');

const isWindows   = process.platform === 'win32';

exports.runTests = async function runTests({ all, cover, projectDir, root, slow, timeout }) {
	const args = [];
	let { execPath } = process;

	process.env.AXWAY_TEST = projectDir;

	// add nyc
	if (cover) {
		const c8ModuleBinDir = resolveModuleBin(root, 'c8');
		if (isWindows) {
            execPath = path.join(c8ModuleBinDir, 'c8.cmd');
        } else {
            args.push(path.join(c8ModuleBinDir, 'c8'));
        }

		args.push(
			'--exclude', 'test',
			'--exclude', 'packages/*/test/**/*.js', // exclude tests
			// supported reporters:
			//   https://github.com/istanbuljs/istanbuljs/tree/master/packages/istanbul-reports/lib
			'--reporter=html',
			'--reporter=json',
			'--reporter=lcovonly',
			'--reporter=text',
			'--reporter=text-summary',
			'--reporter=cobertura',
			'--clean', 'false',
			process.execPath // need to specify node here so that spawn-wrap works
		);

		process.env.FORCE_COLOR = 1;
		process.env.AXWAY_COVERAGE = projectDir;
	}

	// add mocha
	const mocha = resolveModule(root, 'mocha');
	if (!mocha) {
		log('Unable to find mocha!');
		process.exit(1);
	}
	args.push(path.join(mocha, 'bin', 'mocha'));

	// add --inspect
	if (process.argv.includes('--debug') || process.argv.includes('--inspect') || process.argv.includes('--inspect-brk')) {
		args.push('--inspect-brk', '--timeout', '9999999');
	} else if (timeout) {
		args.push('--timeout', timeout);
	}
	if (slow) {
		args.push('--slow', slow);
	}

	const jenkinsReporter = resolveModule(root, 'mocha-jenkins-reporter');
	if (jenkinsReporter) {
		args.push(`--reporter=${jenkinsReporter}`);
	}

	process.env.JUNIT_REPORT_PATH = path.join(projectDir, 'junit.xml');
	process.env.JUNIT_REPORT_NAME = path.basename(projectDir);

	// add grep
	let p = process.argv.indexOf('--grep');
	if (p !== -1 && p + 1 < process.argv.length) {
		args.push('--grep', process.argv[p + 1]);
	}

	// add transpile setup
	if (!cover) {
		args.push(path.join(__dirname, 'test-transpile.js'));
	}

	// add unit test setup
	args.push(path.join(__dirname, 'test-setup.js'));

	// add suite
	p = process.argv.indexOf('--suite');
	if (p !== -1 && p + 1 < process.argv.length) {
		const suites = process.argv[p + 1].split(',');
		args.push.apply(args, suites.map(s => `test/**/test-${s}.js`));
		if (all) {
			args.push.apply(args, suites.map(s => `packages/*/test/**/test-${s}.js`));
		}
	} else {
		args.push('test/**/test-*.js');
		if (all) {
			args.push('packages/*/test/**/test-*.js');
		}
	}

	const cmd = `${execPath} ${args.join(' ')}`;
	log(`Running: ${ansiColors.cyan(cmd)}`);

	// run!
	try {
		const result = execSync(cmd, { stdio: 'inherit'});
		if (result) {
			const err = new Error('At least one test failed :(');
			err.showStack = false;
			throw err;
		}
	} finally {
		const coverageDir = path.join(projectDir, 'coverage');
		if (cover && fs.existsSync(coverageDir)) {
			fs.copySync(path.join(__dirname, 'styles'), coverageDir);
		}

		const after = path.join(projectDir, 'test', 'after.js');
		if (fs.existsSync(after)) {
			require(after);
		}
	}
}

function resolveModuleBin(root, name) {
	return path.resolve(resolveModule(root, name), '..', '.bin');
}

function resolveModule(root, name) {
	let dir = path.join(root, name);
	if (fs.existsSync(dir)) {
		return dir;
	}

	try {
		return path.dirname(require.resolve(name));
	} catch (e) {
		return null;
	}
};
