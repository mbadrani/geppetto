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
    path: 'trace/9390.json',
    categories: ['devtools.timeline']
  });
  await page.goto(global.URL + 'admin-dev');
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

const createNewProduct = async (productData) => {
  await page.waitFor('#subtab-AdminCatalog');
  await page.click('#subtab-AdminCatalog');
  await page.waitFor(1000);
  await page.waitFor('#subtab-AdminProducts');
  await page.click('#subtab-AdminProducts').then(() => console.log('should go to "Products" page'));
  await page.waitFor(2000);
  await page.waitFor('#page-header-desc-configuration-add');
  await page.click('#page-header-desc-configuration-add').then(() => console.log('should click on "New product" button'));
  await page.waitFor(2000);
  await page.waitFor('#form_step1_name_1');
  await page.type('#form_step1_name_1', productData.name + global.dateTime).then(() => console.log('should set the "Name" input'));
  await page.waitFor('#show_variations_selector > div:nth-child(3) > label > input[type="radio"]');
  await page.click('#show_variations_selector > div:nth-child(3) > label > input[type="radio"]').then(() => console.log('should click on "Product with combinations" radio button'));
  await page.waitFor('#form_step6_reference');
  await page.type('#form_step6_reference', productData.reference).then(() => console.log('should set the "Reference" input'));
  await page.waitFor('input#form_step1_price_shortcut');
  await page.$eval('input#form_step1_price_shortcut', (el, value) => el.value = value, productData.priceTTC).then(() => console.log('should set the "Price TTC" input'));
  await page.waitFor(2000);
  await page.waitFor('#tab_step3 > a');
  await page.click('#tab_step3 > a').then(() => console.log('should click on "Combinations" tab'));
  await page.waitFor(2000);
  await page.waitFor('#attribute-group-1 > div > div:nth-child(1) > label');
  await page.click('#attribute-group-1 > div > div:nth-child(1) > label').then(() => console.log('should click on "S" size checkbox button'));
  await page.waitFor(2000);
  await page.waitFor('#attribute-group-2 > div > div:nth-child(11) > label');
  await page.click('#attribute-group-2 > div > div:nth-child(11) > label').then(() => console.log('should click on "Green" color checkbox button'));
  await page.waitFor(2000);
  await page.waitFor('#create-combinations');
  await page.click('#create-combinations').then(() => console.log('should click on "Generate" button'));
  await page.waitFor(5000);
  await page.waitForSelector('#accordion_combinations > tr:nth-child(1)', {visibility: true}).then(() => console.log('should check that the first combination is well generated'));
  await page.waitFor('#attribute-group-1 > div > div:nth-child(2) > label');
  await page.click('#attribute-group-1 > div > div:nth-child(2) > label').then(() => console.log('should click on "M" size checkbox button'));
  await page.waitFor(2000);
  await page.waitFor('#attribute-group-2 > div > div:nth-child(10) > label');
  await page.click('#attribute-group-2 > div > div:nth-child(10) > label').then(() => console.log('should click on "Blue" color checkbox button'));
  await page.waitFor(2000);
  await page.waitFor('#create-combinations');
  await page.click('#create-combinations').then(() => console.log('should click on "Generate" button'));
  await page.waitFor(5000);
  await page.waitForSelector('#accordion_combinations > tr:nth-child(2)', {visibility: true}).then(() => console.log('should check that the second combination is well generated'));
  await page.waitFor(2000);
  await page.waitFor('#toggle-all-combinations');
  await page.click('#toggle-all-combinations').then(() => console.log('should select all created combinations'));
  await page.waitFor(2000);
  await page.waitForSelector('#product_combination_bulk_quantity', {visibility: true});
  await page.type('#product_combination_bulk_quantity', productData.quantity).then(() => console.log('should set the "Quantity" input'));
  await page.waitFor(2000);
  await page.waitFor('#apply-on-combinations');
  await page.click('#apply-on-combinations').then(() => console.log('should click on "Apply" button'));
  await page.waitFor(2000);
  const exist = await page.$('a[title="Close Toolbar"]', {visible: true});
  if (exist !== null) {
    await page.click('a[title="Close Toolbar"]');
  }
  await page.waitFor(2000);
  await page.waitFor('div.switch-input');
  await page.click('div.switch-input').then(() => console.log('should switch the created product online'));
};

const accessToFo = async () => {
  await page.waitFor(10000);
  await page.waitFor('#header_shopname');
  await page.click('#header_shopname').then(async () => {
    await page.waitFor(3000);
    const pages = await browser.pages();
    global.page = await pages[1];
    await page.bringToFront();
  }).then(() => console.log('should go to the Front Office'));
  await page.waitFor(2000);
  await page.setViewport({width: 0, height: 0});
  await page.reload();
  await page.waitFor('body').then(() => console.log('should check that the page is well opened'));
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

const checkProductCombinationInFo = async () => {
  await page.waitFor(2000);
  await page.select('#group_1', '2');

  await page.waitFor(2000);
  try {
    await page.$eval('div.alert-danger', el => el)
      .then((el) => el !== null ? global.exists = true : false )
      .then(() => expect(global.exists).to.be.false);
  } catch (e) {
    console.log('Error: ' + e);
  }
  const pages = await browser.pages();
  global.page = await pages[0];
  await page.bringToFront().then(() => console.log('should go back to the Back Office'));
};

const deleteProduct = async (productName) => {
  await page.click('#subtab-AdminProducts').then(() => console.log('should go to "Products" page'));
  await page.waitFor(2000);
  await page.waitFor('input[name="filter_column_name"]');
  await page.type('input[name="filter_column_name"]', productName).then(() => console.log('should set the "Search name" input'));
  await page.waitFor(4000);
  await page.waitForSelector('button[name="products_filter_submit"]', { visible: true });
  await page.click('button[name="products_filter_submit"]').then(() => console.log('should click on "Search" button'));
  await page.waitFor(2000);
  await page.click('.btn-group > button.product-edit');
  await page.waitFor(2000);
  await page.waitFor('a.product-edit[onclick*="delete"]');
  await page.click('a.product-edit[onclick*="delete"]').then(() => console.log('should click on "Delete" action from the dropdown list'));
  await page.waitFor(2000);
  await page.waitForSelector('div.modal-footer > button[value="confirm"]', { visible: true });
  await page.click('div.modal-footer > button[value="confirm"]').then(() => console.log('should click on "Delete now" button'));
  await page.waitFor(2000);
  await page.waitForSelector('button[type="reset"]');
  await page.click('button[type="reset"]').then(() => console.log('should click on "Reset" button'));
};

let productData = {
  name: 'PC',
  reference: 'PC 9390',
  priceTTC: 10.000000,
  quantity: '100'
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9390
 */
open()
  .then(() => console.log('should open the browser'))
  .then(async () => {
    await accessToBo().then(async () => {
      await signInBo();
      await createNewProduct(productData);
    });
    await accessToFo().then(async () => {
      await searchProductInFo(productData.name + global.dateTime);
      await checkProductCombinationInFo();
    });
    await deleteProduct(productData.name + global.dateTime);
    await page.tracing.stop();
    await browser.close();
  });