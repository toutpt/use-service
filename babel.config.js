module.exports = function(api) {
	if (api) {
		api.cache(true);
	}
	const presets = [
		[
			'@babel/preset-env',
			{
				targets: {
					browsers: ['>0.25%', 'not op_mini all', 'IE 11'],
				},
			},
		]
	];
	const plugins = [
		// '@babel/plugin-proposal-class-properties',
		// '@babel/plugin-transform-object-assign',
		// '@babel/plugin-proposal-object-rest-spread',
	];
	// const ignore = ['**/**/*.css'];

	return {
		presets,
		plugins,
	};
};
