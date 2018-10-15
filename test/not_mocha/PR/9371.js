const puppeteer = require('puppeteer');
require('../../globals');
const chai = require('chai');
chai.use(require('chai-string'));
const expect = chai.expect;

const checkSearchPage = async () => {
  const browser = await puppeteer.launch({headless: false, args: [`--window-size=${1280},${1024}`]});
  const pages = await browser.pages();
  global.page = await pages[0];
  await page.tracing.start({
    path: 'trace/9371.json',
    categories: ['devtools.timeline']
  });
  await page._client.send('Emulation.clearDeviceMetricsOverride');

  /** Get the displayed product list in the Front office **/
  await page.goto(global.URL);
  await page.waitFor('.logo');
  await page.click('#category-6 > a').then(() => console.log('should click on "Accessories" menu'));
  await page.waitFor('.block-category.card.card-block');
  await page.click('.category-sub-menu li:nth-child(2) > a').then(() => console.log('should click on "Home Accessories" sub category menu'));
  await switchShopLanguageInFo('en');
  await page.waitFor(2000);
  console.log('should get the displayed product\'s name');
  let dataFO = await page.evaluate(() => {
    let as = Array.from(document.querySelectorAll('div.product-description > h2 > a'));
    return as.map(a => a.textContent)
  });

  /** Get the displayed product list in the Back office and compare the two results **/
  await page.goto(global.URL + global.adminFolderName).then(() => console.log('should go to the Back Office'));
  await page.waitFor('body').then(() => console.log('should check that the authentication page is well opened'));
  await signInBo();
  await page.waitFor('#subtab-AdminCatalog', {visible: true});
  await page.click('#subtab-AdminCatalog').then(() => console.log('should click on "Catalog"'));
  await page.waitFor(2000);
  await page.click('#subtab-AdminProducts').then(() => console.log('should go to "Products" page'));
  await page.waitFor('#product_catalog_category_tree_filter');
  await page.click('#product_catalog_category_tree_filter button').then(() => console.log('should click on "Filter by categories"'));
  await page.waitFor('a[name=product_catalog_category_tree_filter_expand]');
  await page.click('a[name=product_catalog_category_tree_filter_expand]').then(() => console.log('should expand categories'));
  await page.waitFor('#tree-categories');
  await page.click('#tree-categories input[value="8"]').then(() => console.log('should select "Home Accessories" categories'));
  await page.waitFor(3000);
  await page.click('div[data-sort-col-name=id_product]').then(() => console.log('should sort products'));
  await page.waitFor(3000);
  console.log('should get the displayed product\'s name');
  let dataBO = await page.evaluate(() => {
    let as = Array.from(document.querySelectorAll('#product_catalog_list td:nth-child(4) > a'));
    return as.map(a => a.textContent)
  });
  await page.click('div[data-sort-col-name=id_product]');
  await page.waitFor('#product_catalog_category_tree_filter button');
  await page.click('#product_catalog_category_tree_filter button').then(() => console.log('should click on "Filter by categories"'));
  await page.waitFor('a[name=product_catalog_category_tree_filter_reset]');
  await page.click('a[name=product_catalog_category_tree_filter_reset]').then(() => console.log('should reset filter'));
  console.log('should check that the displayed products in the Front Office are the same as in the Back Office');
  expect(dataFO).to.deep.equal(dataBO);

  await page.tracing.stop();
  await browser.close();
};

const signInBo = async () => {
  await page.waitFor('#email');
  await page.type('#email', global.email);
  await page.waitFor('#passwd');
  await page.type('#passwd', global.password);
  await page.click('#submit_login').then(() => console.log('should login successfully in the Back Office'));
  await page.waitFor('body').then(() => console.log('should check that the dashboard page is well opened'));
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
checkSearchPage();