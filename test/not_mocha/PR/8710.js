const puppeteer = require('puppeteer');
require('../../globals');
const chai = require('chai');
chai.use(require('chai-string'));
const expect = chai.expect;

const open = async () => {
  global.browser = await puppeteer.launch({headless: false, args: [`--window-size=${1280},${1054}`]});
};

const accessToBo = async () => {
  const pages = await browser.pages();
  global.page = await pages[0];
  await page.tracing.start({
    path: 'trace/8710.json',
    categories: ['devtools.timeline']
  });
  await page.goto(global.URL + global.adminFolderName);
  await page._client.send('Emulation.clearDeviceMetricsOverride');
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

const createProductWithCombination = async (productData) => {
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
  try {
    await page.$eval('#tab_step3 > a', el => el.textContent)
      .then((el) => expect(el).to.be.equal("Combinations"))
      .then(() => console.log('should check that the Tab "Combinations" exist'))
  } catch (e) {
    console.log('Error: ' + e);
  }
  await page.click('#tab_step3 > a').then(() => console.log('should click on "Combinations" tab'));
  await page.type('#form_step3_attributes-tokenfield', "Size");
  await page.waitFor(2000);
  await page.click('#attributes-generator div.tt-dataset  div:nth-child(1)').then(() => console.log('should select all Sizes'));
  await page.type('#form_step3_attributes-tokenfield', "Color");
  await page.waitFor(2000);
  await page.click('#attributes-generator div.tt-dataset  div:nth-child(1)').then(() => console.log('should select all Colors'));
  await page.type('#form_step3_attributes-tokenfield', "Dimension");
  await page.waitFor(2000);
  await page.click('#attributes-generator div.tt-dataset  div:nth-child(1)').then(() => console.log('should select all Dimensions'));
  await page.click('#create-combinations').then(() => console.log('should click on "Generate" button'));
  await page.waitFor('#growls-default div.growl-message', {visible: true, timeout: 90000});
  await page.reload({
    waitUntil: 'domcontentloaded',
    timeout: 120000
  }).then(() => console.log('should wait until the page is loaded'));
  await page.waitFor('#accordion_combinations > tr:nth-child(1) > td.attribute-quantity > div > input', {
    visible: true,
    timeout: 120000
  }).then(() => console.log('should check the appearance of combinations'));
  await page.$eval('#accordion_combinations > tr:nth-child(1) > td.attribute-quantity > div > input', (el, value) => el.value = value, 50).then(() => console.log('should set quantity of the first combination'));
  await page.waitFor(2000);
  await page.$eval('#accordion_combinations > tr:nth-child(2) > td.attribute-quantity > div > input', (el, value) => el.value = value, 50).then(() => console.log('should set quantity of the second combination'));
  await page.waitFor(2000);
  await page.evaluate(() => {
    document.querySelector('.sf-toolbarreset').style.display = 'none';
  });
  await page.click('button.js-btn-save[type=submit]').then(() => console.log('should click on "Save" button'));
  await page.waitFor(3000);
  let error = await page.$('#form > div.col-md-10.has-danger > ul > li', {visible: true});
  try {
    expect(error).to.be.a('null')
  } catch (e) {
    await page.$eval('#form > div.col-md-10.has-danger > ul > li', el => el.innerText).then((text) => {
      console.log('Error: ' + text);
    });
  }
  let shippingError = await page.$('#tab_step4.has-error', {visible: true});
  try {
    expect(shippingError).to.be.a('null')
  } catch (e) {
    console.log('Error: Shipping tab has danger !');
  }
  let pricingError = await page.$('#tab_step2.has-error', {visible: true});
  try {
    expect(pricingError).to.be.a('null')
  } catch (e) {
    console.log('Error: Pricing tab has danger !');
  }
};

let productData = {
  name: 'P1',
  reference: 'P8710',
  quantity: '10',
  discount: '4'
};

/** This scenario is based on the bug described in this PR
 * before running this test, must check that the value of max_input_vars in php.ini equal to 5000
 * https://github.com/PrestaShop/PrestaShop/pull/8710
 */

open()
  .then(() => console.log('should open the browser'))
  .then(() => {
    accessToBo().then(async () => {
      await signInBo();
      await createProductWithCombination(productData);
      await page.tracing.stop();
      await browser.close();
    });
  });