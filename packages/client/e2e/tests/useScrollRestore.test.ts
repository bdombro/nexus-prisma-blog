import 'expect-puppeteer';
import { loadPage } from '../lib/load';

describe('useScrollRestore', () => {
	it('should restore scroll', async () => {
		await loadPage({ pathname: '/vip' });

		const res = await page.evaluate(async () => {
			const scrollable = document.getElementById('ContentContainer');
			scrollable.scrollTo(0, scrollable.scrollHeight);
			await wait(1000);
			document.querySelector('a[href="/"]').click();
			await wait(1000);
			/* eslint-disable */
			history.back();
			await wait(1000);
			const shouldBeVisible = document.querySelector('div[label="Create a Refund"]');
			return isElementInViewport(shouldBeVisible);

			function wait(ms) {
				return new Promise(function(resolve) {
					setTimeout(resolve, ms);
				});
			}
			function isElementInViewport(el) {
				const rect = el.getBoundingClientRect();
				return (
					rect.bottom > 0 &&
					rect.right > 0 &&
					rect.left < window.innerWidth &&
					rect.top < window.innerHeight
				);
			}
		});
		expect(res).toBeTruthy();
	});
});
