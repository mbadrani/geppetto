const puppeteer = require('puppeteer');
const globals = require('../../globals');
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
    path: 'trace/9335.json',
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


  await page.waitFor('#search_widget > form > button > i[class*="search"]');
  await page.click('#search_widget > form > button > i[class*="search"]').then(() => console.log('should click on "Search" button'));

  await page.waitFor('.h3.product-title > a').then(() => console.log('should check the appearance of product ' + productName));
  await page.click('.h3.product-title > a').then(() => console.log('should go to the product page'));
};

const checkProductUrl = async () => {
  await page.waitFor(2000);
  let currentUrl = await page.target().url();
  await page.$eval('#group_1 > option[selected="selected"]', el => el.title).then((size) => {
    expect(currentUrl).to.contain('size-' + size.toLowerCase());
    console.log('should check that the url contain ' + 'size-' + size.toLowerCase());
  });
  await page.$eval('#group_2 > li:nth-child(1) > label', el => el.innerText).then((color) => {
    expect(currentUrl).to.contain('color-' + color.toLowerCase());
    console.log('should check that the url contains ' + 'color-' + color.toLowerCase());
  });
  await page.waitFor(2000);
  await page.waitFor('#group_1');
  await page.select('#group_1', '2').then(() => console.log('should switch the product size to "M"'));
  await page.waitFor(2000);
  await page.reload().then(() => console.log('should refresh the current page'));
  await page.waitFor(2000);
  currentUrl = await page.target().url();
  await page.$eval('#group_1 > option[selected="selected"]', el => el.title).then((size) => {
    expect(currentUrl).to.contain('size-' + size.toLowerCase());
    console.log('should check that the url contain ' + 'size-' + size.toLowerCase());
  });
  await page.click('#group_2 > li:nth-child(2) > label').then(() => console.log('should click on "Black" color'));
  await page.waitFor(2000);
  await page.reload().then(() => console.log('should refresh the current page'));
  await page.waitFor(2000);
  currentUrl = await page.target().url();
  await page.$eval('#group_2 > li:nth-child(2) > label', el => el.innerText).then((color) => {
    expect(currentUrl).to.contain('color-' + color.toLowerCase());
    console.log('should check that the url contain ' + 'color-' + color.toLowerCase());
  });
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9335
 */
open()
  .then(() => console.log('should open the browser'))
  .then(() => {
    accessToFo().then(async () => {
      await switchShopLanguageInFo('en');
      await searchProductInFo('T-Shirt');
      await checkProductUrl();
      await page.tracing.stop();
      await browser.close();
    });
  });