const puppeteer = require('puppeteer');
require('../../globals');
const chai = require('chai');
chai.use(require('chai-string'));
const expect = chai.expect;

const open = async () => {
  global.browser = await puppeteer.launch({headless: false, args: [`--window-size=${1280},${1024}`]});
};

const accessToBo = async () => {
  const pages = await browser.pages();
  global.page = await pages[0];
  await page.tracing.start({
    path: 'trace/9285.json',
    categories: ['devtools.timeline']
  });
  await page.goto(global.URL + '/admin-dev');
  await page.setViewport({width: 0, height: 0});
  await page.waitFor('body').then(() => console.log('should check that the authentication page is well opened'));
};

const signInBo = async () => {
  await page.waitFor('#email');
  await page.type('#email', global.email);
  await page.waitFor('#passwd');
  await page.type('#passwd', global.password);
  await page.click('#submit_login').then(() => console.log('should login successfully in the Back Office'));
  await page.waitForNavigation({waitUntil: 'domcontentloaded'});
  await page.waitFor('body').then(() => console.log('should check that the dashboard page is well opened'));
};

const EditNumberProductsPerPage = async (number) => {
  await page.waitFor('#subtab-ShopParameters');
  await page.click('#subtab-ShopParameters');
  await page.waitFor(1000);
  await page.waitFor('#subtab-AdminPPreferences');
  await page.evaluate(() => {
    document.querySelector('#subtab-AdminPPreferences').scrollIntoView();
  });
  await page.click('#subtab-AdminPPreferences').then(() => { console.log('should go to "Product settings" page') });
  await page.waitFor('#form_pagination_products_per_page');
  await page.$eval('#form_pagination_products_per_page', (el, value) => el.value = value, number).then(() => { console.log('should set the "Products per page" input') });
  await page.waitFor('#configuration_fieldset_order_by_pagination button');
  await page.click('#configuration_fieldset_order_by_pagination button').then(() => { console.log('should click on "Save" button') });
};

const duplicateAllProducts = async () => {
  await page.waitFor('#subtab-AdminCatalog');
  await page.click('#subtab-AdminCatalog');
  await page.waitFor(1000);
  await page.waitFor('#subtab-AdminProducts');
  await page.click('#subtab-AdminProducts').then(() => console.log('should go back to "Products" page'));
  await page.waitFor('#catalog-actions div.md-checkbox label');
  await page.click('#catalog-actions div.md-checkbox label').then(() => console.log('should click on "Select all" checkbox'));
  await page.waitFor('#product_bulk_menu');
  await page.click('#product_bulk_menu').then('should click on "Bulk actions" button');
  await page.waitFor('#catalog-actions a[onclick*="duplicate_all"]');
  await page.click('#catalog-actions a[onclick*="duplicate_all"]').then('should click on "Duplicate selection" action from the dropdown list');
  await page.waitFor(50000);
  await page.waitFor('input[name="filter_column_name"]');
  await page.type('input[name="filter_column_name"]', 'copy').then(() => console.log('should set the "Search name" input'));
  await page.waitFor(2000);
  await page.waitForSelector('button[name="products_filter_submit"]');
  await page.click('button[name="products_filter_submit"]').then(() => console.log('should click on "Search" button'));
  await page.waitFor('#catalog-actions div.md-checkbox label');
  await page.click('#catalog-actions div.md-checkbox label').then(() => console.log('should click on "Select all" checkbox'));
  await page.waitFor(2000);
  await page.waitFor('#product_bulk_menu');
  await page.click('#product_bulk_menu').then(() => console.log('should click on "Bulk actions" button'));
  await page.waitFor('#catalog-actions a[onclick*="activate_all"]');
  await page.click('#catalog-actions a[onclick*="activate_all"]').then(() => console.log('should click on "Activate selection" action from the dropdown list'));
  await page.waitFor(20000);
};

const accessToFo = async () => {
  await page.waitFor(2000);
  await page.waitFor('#header_shopname');
  await page.click('#header_shopname').then(async () => {
    await page.waitFor(3000);
    const pages = await browser.pages();
    page = await pages[1];
    await page.bringToFront();
    await page._client.send('Emulation.clearDeviceMetricsOverride');
  }).then(() => console.log('should go to the Front Office'));
  await page.waitFor(2000);
  await page.reload();
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

const checkNumberProductsPerPage = async () => {
  await page.waitFor(2000);
  await page.waitFor('a.all-product-link');
  await page.click('a.all-product-link');

  await page.waitFor('#js-product-list-top p');
  await page.$eval('#js-product-list-top p', el => el.innerText).then((text) => {
    try {
      expect(parseInt(text.match(/\d+/g)[0])).to.be.gt(36);
      console.log('should check that the number of products per page is greater than "36"');
    } catch (error) {
      console.log('Error: ' + error);
    }
  });

  const pages = await browser.pages();
  global.page = await pages[0];
  await page.bringToFront().then(() => console.log('should go back to the Back Office'));
};

const deleteProduct = async () => {
  await page.click('#subtab-AdminProducts').then(() => console.log('should go back to "Products" page'));
  await page.waitFor(2000);
  await page.waitFor('input[name="filter_column_name"]');
  await page.$eval('input[name="filter_column_name"]', (el, value) => el.value = value, 'copy').then(() => console.log('should set the "Search name" input'));
  await page.waitFor(2000);
  await page.waitForSelector('button[name="products_filter_submit"]');
  await page.click('button[name="products_filter_submit"]').then(() => console.log('should click on "Search" button'));
  await page.waitFor(2000);
  await page.waitFor('#catalog-actions div.md-checkbox label');
  await page.click('#catalog-actions div.md-checkbox label').then(() => console.log('should click on "Select all" checkbox'));
  await page.waitFor('#product_bulk_menu');
  await page.click('#product_bulk_menu').then(() => console.log('should click on "Bulk actions" button'));
  await page.waitFor('#catalog-actions a[onclick*="delete_all"]');
  await page.click('#catalog-actions a[onclick*="delete_all"]').then(() => console.log('should click on "Delete selection" action from the dropdown list'));
  await page.waitFor(2000);
  await page.waitForSelector('div.modal-footer > button[value="confirm"]', { visible: true });
  await page.click('div.modal-footer > button[value="confirm"]').then(() => console.log('should click on "Delete now" button'));
  await page.waitForNavigation({timeout: 50000, waitUntil: 'networkidle0'});
  await page.waitFor(2000);
  await page.waitForSelector('button[type="reset"]');
  await page.click('button[type="reset"]').then(() => console.log('should click on "Reset" button'));
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9285
 */
open()
  .then(() => console.log('should open the browser'))
  .then(async () => {
    await accessToBo().then(async () => {
      await signInBo();
      await EditNumberProductsPerPage('40');
      await duplicateAllProducts();
    });
    await accessToFo().then(async () => {
      await switchShopLanguageInFo('en');
      await checkNumberProductsPerPage();
    });
    await deleteProduct();
    await page.tracing.stop();
    await browser.close();
  });
