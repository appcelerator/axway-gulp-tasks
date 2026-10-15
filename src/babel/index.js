const profiles = {};
for (const ver of [ 12, 14 ]) {
	// eslint-disable-next-line security/detect-non-literal-require
	profiles[`node${ver}`] = require(`./node${ver}`);
}

module.exports = function getBabelConf(opts) {
	const name = process.env.AXWAY_BABEL_CONF = [
		opts && opts.babel,
		process.env.AXWAY_BABEL_CONF,
		'node12'
	].reduce((p, n) => {
		return !p && n && profiles[n] ? n : p;
	});

	return profiles[name];
};
