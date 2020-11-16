module.exports = {
	server: [
		{
			command: 'cd ../ && NODE_ENV=development BROWSER=none npm start',
			port: 3000,
			launchTimeout: 40000,
			usedPortAction: 'kill',
			// debug: true,
		},
		{
			command: 'cd ../../server && NODE_ENV=development E2E_USER_AUTHORIZED=true npm start',
			port: 4000,
			launchTimeout: 20000,
			usedPortAction: 'kill',
			// debug: true,
		},
	],
	launch: {
		headless: true,
		slowMo: 300,
	},
};
