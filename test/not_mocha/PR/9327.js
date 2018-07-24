const puppeteer = require('puppeteer');
let argv = require('minimist')(process.argv.slice(2));

const checkProductPage = async () => {
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
	await page.click('#subtab-ShopParameters');
	await page.waitFor('#subtab-AdminPPreferences');
	await page.click('#subtab-AdminPPreferences');
	await page.waitFor('#configuration_form');
	await page.click('label[for="form_stock_stock_management_0"]');
	await page.click('#configuration_fieldset_stock > div.card-footer > div > button');
	await page.waitFor('#subtab-AdminCatalog');
	await page.click('#subtab-AdminCatalog');
	await page.waitFor(1000);
	await page.click('#subtab-AdminProducts');
	await page.waitFor(1000);
	await page.click('div.btn-group > a.product-edit:first-child');
	await page.waitForSelector('#form', {visible: true, timeout: 10000});

	await page.tracing.stop();
	await browser.close();
};

checkProductPage();
