const puppeteer = require('puppeteer');
require('../../globals');

const checkProductPage = async () => {
  const browser = await puppeteer.launch({headless: false, args: [`--window-size=${1280},${1024}`]});
  const pages = await browser.pages();
  const page = await pages[0];

  await page.tracing.start({
    path: 'trace/9327.json',
    categories: ['devtools.timeline']
  });
  await page.goto(global.URL + '/admin-dev');

  await page._client.send('Emulation.clearDeviceMetricsOverride');
  await page.waitFor('body');
  await page.type('#email', global.email);
  await page.type('#passwd', global.password);
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
