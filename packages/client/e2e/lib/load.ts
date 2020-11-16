const rootSelector = '#root';

export const getRoot = async () => await page.$(rootSelector);

export const loadPage = async ({ pathname = '/', isAuthorized = true }) => {
	if (isAuthorized) {
		page.setCookie({ name: 'e2e_isAuthorized', value: 'true', domain: 'localhost' });
	} else {
		page.deleteCookie({ name: 'e2e_isAuthorized', domain: 'localhost' });
	}
	await page.goto(`${URL}${pathname}`, {
		waitUntil: 'networkidle0',
		timeout: 60000,
	});
};
