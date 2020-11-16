import 'expect-puppeteer';
import { loadPage } from '../lib/load';

describe('React App', () => {
	it("should be titled 'React • Dombro'", async () => {
		await loadPage({});
		expect(await page.title()).toBe('React • Dombro');
	});
});
