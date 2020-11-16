module.exports = {
	preset: 'jest-puppeteer',
	globals: {
		URL: 'http://localhost:3000',
	},
	testMatch: ['**/tests/*.test.ts'],
	transform: {
		'\\.ts$': 'react-scripts/config/jest/babelTransform',
	},
	verbose: true,
	setupFilesAfterEnv: ['./lib/setup.ts'],
	maxConcurrency: 1,
};
