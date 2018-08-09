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
    path: 'trace/9388.json',
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

const createProduct = async (productData) => {
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
  await page.waitFor('#show_variations_selector > div:nth-child(2) > label > input[type="radio"]');
  await page.click('#show_variations_selector > div:nth-child(2) > label > input[type="radio"]').then(() => console.log('should click on "Simple product" radio button'));
  await page.waitFor('#form_step6_reference');
  await page.type('#form_step6_reference', productData.reference).then(() => console.log('should set the "Reference" input'));
  await page.waitFor('#form_step1_qty_0_shortcut');
  await page.$eval('#form_step1_qty_0_shortcut', (el, value) => el.value = value, productData.quantity).then(() => console.log('Set the "Quantity" of product"'));
  await page.waitFor(2000);
  const exist = await page.$('a[title="Close Toolbar"]', {visible: true});
  if (exist !== null) {
    await page.click('a[title="Close Toolbar"]');
  }
};

const addSpecificPrice = async (productData) => {
  await page.waitFor('#tab_step2 > a');
  await page.click('#tab_step2 > a').then(() => console.log('Go to the pricing tab'));
  await page.waitFor('#specific-price > a');
  await page.click('#specific-price > a').then(() => console.log('should click on add "Specific price" button'));
  await page.waitFor('#select2-form_step2_specific_price_sp_id_currency-container');
  await page.click('#select2-form_step2_specific_price_sp_id_currency-container');
  await page.waitFor('li[class*="select2-results__option select2-results__option--highlighted"]');
  await page.click('li[class*="select2-results__option select2-results__option--highlighted"]').then(() => console.log('should choose currency'));
  await page.waitFor('#select2-form_step2_specific_price_sp_id_country-container');
  await page.click('#select2-form_step2_specific_price_sp_id_country-container');
  await page.waitFor('input[class*="select2-search__field"]');
  await page.type('input[class*="select2-search__field"]', 'Albania').then(() => console.log('should search for country "Albania"'));
  await page.waitFor('#select2-form_step2_specific_price_sp_id_country-results > li');
  await page.click('#select2-form_step2_specific_price_sp_id_country-results > li').then(() => console.log('should choose the country "Albania"'));
  await page.waitFor('#select2-form_step2_specific_price_sp_id_group-container');
  await page.click('#select2-form_step2_specific_price_sp_id_group-container');
  await page.waitFor('li.select2-results__option.select2-results__option--highlighted');
  await page.click('li.select2-results__option.select2-results__option--highlighted').then(() => console.log('should choose the option "Visitor"'));
  await page.waitFor('#form_step2_specific_price_sp_reduction');
  await page.$eval('#form_step2_specific_price_sp_reduction', (el, value) => el.value = value, productData.discount).then(() => console.log('should set the "Apply a discount of value'));
  await page.waitFor('#form_step2_specific_price_sp_reduction_type');
  await page.click('#form_step2_specific_price_sp_reduction_type');
  await page.select('select#form_step2_specific_price_sp_reduction_type', 'percentage').then(() => console.log('should select the discount type "€"'));
  await page.waitFor('#form_step2_specific_price_save');
  await page.click('#form_step2_specific_price_save').then(() => console.log('should click on "Apply button"'));
  await page.waitFor('.growl-close');
  await page.click('.growl-close').then(() => console.log('should check that the success alert message is well displayed'));
  await page.waitFor('div.dropdown > button[type="submit"]');
  await page.click('div.dropdown > button[type="submit"]').then(() => console.log('should click on "Save" button'));
  await page.waitFor('.growl-close');
  await page.click('.growl-close').then(() => console.log('should check that the success alert message is well displayed'));
};

const checkSpecificPrice = async () => {
  await page.waitFor('table[id*="js-specific-price-list"]').then(() => console.log('should check the existence of the "Price list"'));
  await page.waitFor('a[class*="specific-price-edit btn"]');
  await page.click('a[class*="specific-price-edit btn"]').then(() => console.log('should click on the "Edit" icon'));
  await page.waitFor('div[id*="specific_price_form"]').then(() => console.log('should check the existence of the "Specific price conditions table"'));
};

let productData = {
  name: 'P1',
  reference: 'P9388',
  quantity: '10',
  discount: '4'
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9388
 */

open()
  .then(() => console.log('should open the browser'))
  .then(() => {
    accessToBo().then(async () => {
      await signInBo();
      await createProduct(productData);
      await addSpecificPrice(productData);
      await checkSpecificPrice();
      await page.tracing.stop();
      await browser.close();
    });
  });

