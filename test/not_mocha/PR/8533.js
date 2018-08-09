const puppeteer = require('puppeteer');
const globals = require('../../globals');
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
    path: 'trace/8533.json',
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
  await page.waitFor('body').then(() => console.log('should check that the dashboard page is well opened'));
};

const createCatalogPriceRule = async () => {
  await page.waitFor('#subtab-AdminCatalog');
  await page.click('#subtab-AdminCatalog');
  await page.waitFor(1000);
  await page.click('#subtab-AdminParentCartRules').then(() => { console.log('should go to "Discount" page') });
  await page.waitFor('#subtab-AdminSpecificPriceRule');
  await page.click('#subtab-AdminSpecificPriceRule').then(() => { console.log('should click on "Catalog price rule" tab') });
  await page.waitFor('#page-header-desc-specific_price_rule-new_specific_price_rule');
  await page.click('#page-header-desc-specific_price_rule-new_specific_price_rule').then(() => { console.log('should click on "Add new catalog price rule" button') });
  await page.waitFor('#name');
  await page.type('#name', '5% on all products').then(() => { console.log('should set the "Name" input') });
  await page.waitFor('#reduction_type');
  await page.select('#reduction_type', 'percentage').then(() => { console.log('should choose "Percentage" from the reduction type select') });
  await page.waitFor('#reduction');
  await page.$eval('#reduction', (el, value) => el.value = value, '5').then(() => { console.log('should set the "Reduction" input') });
  await page.waitFor('#specific_price_rule_form_submit_btn');
  await page.click('#specific_price_rule_form_submit_btn').then(() => { console.log('should click on "Save" button') });
};

const editProduct = async (productName) => {
  await page.waitFor(2000);
  await page.waitFor('#subtab-AdminProducts');
  await page.click('#subtab-AdminProducts').then(() => console.log('should go to "Products" page'));
  await page.waitFor('input[name="filter_column_name"]');
  await page.$eval('input[name="filter_column_name"]', (el, value) => el.value = value, productName).then(() => console.log('should set the "Search name" input'));
  await page.waitFor(2000);
  await page.waitForSelector('button[name="products_filter_submit"]');
  await page.click('button[name="products_filter_submit"]').then(() => console.log('should click on "Search" button'));
  await page.waitFor(3000);
  await page.waitFor('a[class*="edit"]');
  await page.click('a[class*="edit"]').then(() => console.log('should click on "Edit" icon'));
  await page.waitFor(2000);
  const exist = await page.$('a[title="Close Toolbar"]', {visible: true});
  if (exist !== null) {
    await page.click('a[title="Close Toolbar"]');
  }
  await page.waitFor(2000);
  await page.click('div.dropdown > button[type="submit"]').then(() => console.log('should click on "Save" button'));
};

const duplicateProduct = async () => {
  await page.click('#subtab-AdminProducts').then(() => console.log('should go back to "Products" page'));
  await page.waitFor(2000);
  await page.click('.btn-group > button.product-edit');
  await page.waitFor('a.product-edit[onclick*="duplicate"]');
  await page.click('a.product-edit[onclick*="duplicate"]').then('should click on "Duplicate" action from dropdown list');
};

const checkDuplicatedProduct = async () => {
  await page.waitFor('div.alert-text > p');
  await page.$eval('div.alert-text > p', el => el.innerText).then((text) => {
    expect(text).to.equal('Product successfully duplicated.');
    console.log('should check that the product is well duplicated');
  });
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
  await page.click('.btn-group > button.product-edit');
  await page.waitFor(2000);
  await page.waitFor('a.product-edit[onclick*="delete"]');
  await page.click('a.product-edit[onclick*="delete"]').then(() => console.log('should click on "Delete" action from dropdown list'));
  await page.waitFor(2000);
  await page.waitForSelector('div.modal-footer > button[value="confirm"]', { visible: true });
  await page.click('div.modal-footer > button[value="confirm"]').then(() => console.log('should click on "Delete now" button'));
  await page.waitFor(2000);
  await page.waitForSelector('button[type="reset"]');
  await page.click('button[type="reset"]').then(() => console.log('should click on "Reset" button'));
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9335
 */
open()
  .then(() => console.log('should open the browser'))
  .then(() => {
    accessToBo().then(async () => {
      await signInBo();
      await createCatalogPriceRule();
      await editProduct('Hummingbird notebook');
      await duplicateProduct();
      await checkDuplicatedProduct();
      await deleteProduct();
      await page.tracing.stop();
      await browser.close();
    });
  });
