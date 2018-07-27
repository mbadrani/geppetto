const puppeteer = require('puppeteer');
let argv = require('minimist')(process.argv.slice(2));

const checkSearchPage = async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	await page.tracing.start({
		path: 'trace.json',
		categories: ['devtools.timeline']
	});
	await page.goto(argv.URL);

	await page.setViewport({ width: 1600, height: 2500 });
	await page.waitFor('body');
	await page.type('#email', argv.LOGIN || 'demo@prestashop.com');
	await page.type('#passwd', argv.PASSWD ||'prestashop_demo');
	await page.click('#submit_login');
	await page.waitFor('header');
	await page.type('#bo_query', 'recherche');
	await page.keyboard.press('Enter');
	await page.waitForSelector('#content > div.row', {visible: true, timeout: 10000});

	await page.tracing.stop();
	await browser.close();
};

checkSearchPage();
