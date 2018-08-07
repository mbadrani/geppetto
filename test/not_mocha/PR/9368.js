const puppeteer = require('puppeteer');
require('../../globals');
const chai = require('chai');
chai.use(require('chai-string'));
const expect = chai.expect;

const open = async () => {
  global.browser = await puppeteer.launch({headless: false, args: [`--window-size=${1500},${2000}`]});
};

const accessToFo = async () => {
  const pages = await browser.pages();
  global.page = await pages[0];
  await page.tracing.start({
    path: 'trace/9368.json',
    categories: ['devtools.timeline']
  });
  await page.goto(global.URL).then(() => console.log('should go to the Front Office'));
  await page.setViewport({width: 1500, height: 2000});
  await page.waitFor('body').then(() => console.log('should check that the page is well opened'));
};

const switchShopLanguageInFo = async (language = 'fr') => {
  await page.waitFor('#_desktop_language_selector button');
  await page.click('#_desktop_language_selector button');
  await page.waitFor(1000);
  await page.click('#_desktop_language_selector a[href *= "' + language + '"]').then(() => {
    if (language === 'en') {
      console.log('should switch the Front Office to "English"');
    } else {
      console.log('should switch the Front Office to "French"');
    }
  });
};

const searchProductInFo = async (productName) => {
  await page.waitFor(2000);
  await page.waitFor('.ui-autocomplete-input');
  await page.click('.ui-autocomplete-input');
  await page.$eval('.ui-autocomplete-input', (el, value) => el.value = value, productName).then(() => console.log('should set the search input value'));
  await page.waitFor('#search_widget i[class*="search"]');
  await page.click('#search_widget i[class*="search"]').then(() => console.log('should click on "Search" button'));
  await page.waitFor('.h3.product-title > a').then(() => console.log('should check the appearance of product ' + productName));
  await page.click('.h3.product-title > a').then(() => console.log('should go to the product page'));
};

const checkAjaxUrl = async () => {
  await page.waitFor(3000);
  await page.waitFor('#quantity_wanted');
  await page.on('response', async (response) => {
    try {
      expect(response.url()).to.contain('?controller=product&token=');
      console.log('should check that the url of AJAX called contains the param "controller"');
    } catch (error) {
      console.log('Error: ' + error);
    }
  });
  await page.type('#quantity_wanted', '4').then(() => { console.log('should set the "Quantity" input') });
  await page.removeListener('response', async (response) => {});
  await page.waitFor(3000);
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9368
 */
open()
  .then(() => console.log('should open the browser'))
  .then(() => {
    accessToFo().then(async () => {
      await switchShopLanguageInFo('en');
      await searchProductInFo('T-Shirt');
      await checkAjaxUrl();
      await page.tracing.stop();
      await browser.close();
    });
  });