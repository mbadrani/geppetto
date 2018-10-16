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
    path: 'trace/9403.json',
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
  await page.waitFor('#form_step6_reference');
  await page.type('#form_step6_reference', productData.reference).then(() => console.log('should set the "Reference" input'));
  await page.waitFor('#form_step1_qty_0_shortcut');
  await page.$eval('#form_step1_qty_0_shortcut', (el, value) => el.value = value, productData.quantity).then(() => console.log('Set the "Quantity" of product"'));
  await page.waitFor(2000);
  await page.waitFor('input#form_step1_price_shortcut');
  await page.$eval('input#form_step1_price_shortcut', (el, value) => el.value = value, productData.priceTTC).then(() => console.log('should set the "Price TTC" input'));

  await page.waitFor(2000);
  const exist = await page.$('a[title="Close Toolbar"]', {visible: true});
  if (exist !== null) {
    await page.click('a[title="Close Toolbar"]');
  }
  await page.waitFor(2000);
  await page.waitFor('div.switch-input');
  await page.click('div.switch-input').then(() => console.log('should switch the created product online'));
  await page.waitFor('div.dropdown > button[type="submit"]');
  await page.click('div.dropdown > button[type="submit"]').then(() => console.log('should click on "Save" button'));
};

const accessToFo = async () => {
  await page.waitFor(10000);
  await page.waitFor('#header_shopname');
  await page.click('#header_shopname').then(async () => {
    await page.waitFor(5000);
    const pages = await browser.pages();
    global.page = await pages[1];
    await page.bringToFront();
  }).then(() => console.log('should go to the Front Office'));
  await page.waitFor(2000);
  await page._client.send('Emulation.clearDeviceMetricsOverride');
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

const searchProductInFo = async (productName) => {
  await page.waitFor(2000);
  await page.waitFor('.ui-autocomplete-input');
  await page.click('.ui-autocomplete-input');
  await page.$eval('.ui-autocomplete-input', (el, value) => el.value = value, productName).then(() => console.log('should set the search input value'));
  await page.waitFor('#search_widget i[class*="search"]');
  await page.click('#search_widget i[class*="search"]').then(() => console.log('should click on "Search" button'));
  await page.waitFor('.h3.product-title > a').then(() => console.log('should check the appearance of product ' + productName));
  await page.click('a.quick-view').then(async () => {
    console.log('should click on "Quick view" button');
    await page.on('console', msg => {
      try {
        expect(msg.text()).to.not.contain('500');
      } catch (error) {
        console.log(error.message);
      }
    });
  });
};

let productData = {
  name: 'PQ',
  reference: 'PC 9403',
  priceTTC: 10.000000,
  quantity: '100'
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9403
 */
open()
  .then(() => console.log('should open the browser'))
  .then(async () => {
    await accessToBo().then(async () => {
      await signInBo();
      await createNewProduct(productData);
    });
    await accessToFo().then(async () => {
      await switchShopLanguageInFo('en');
      await searchProductInFo(productData.name + global.dateTime);
      const pages = await browser.pages();
      global.page = await pages[0];
      await page.bringToFront();
      await page.tracing.stop();
      await browser.close();
    });
  });