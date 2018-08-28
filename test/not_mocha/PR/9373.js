const puppeteer = require('puppeteer');
require('../../globals');
const chai = require('chai');
chai.use(require('chai-string'));
const expect = chai.expect;

const open = async () => {
  global.browser = await puppeteer.launch({headless: false, args: [`--window-size=${1280},${1024}`]});
};

const accessToFo = async () => {
  const pages = await browser.pages();
  global.page = await pages[0];
  await page.tracing.start({
    path: 'trace/9373.json',
    categories: ['devtools.timeline']
  });
  await page.goto(global.URL);
  await page.setViewport({width: 0, height: 0});
  await page.waitFor('body').then(() => console.log('should check that the authentication page is well opened'));
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

const checkPaymentButtonInCheckout = async () => {
  await page.waitFor(2000);
  await page.waitFor('#add-to-cart-or-refresh button.add-to-cart');
  await page.click('#add-to-cart-or-refresh button.add-to-cart');
  await page.waitFor('#blockcart-modal div.cart-content-btn > a', {visible: true});
  await page.click('#blockcart-modal div.cart-content-btn > a');
  await page.waitFor('#main div.checkout a');
  await page.click('#main div.checkout a');
  await page.waitFor('#checkout-personal-information-step a[href="#checkout-login-form"]');
  await page.click('#checkout-personal-information-step a[href="#checkout-login-form"]');
  await page.waitFor('#login-form input[name="email"]');
  await page.$eval('#login-form input[name="email"]', (el, value) => el.value = value, global.customerEmail);
  await page.waitFor('#login-form input[name="password"]');
  await page.$eval('#login-form input[name="password"]', (el, value) => el.value = value, global.customerPassword);
  await page.waitFor('#login-form button.continue');
  await page.click('#login-form button.continue');
  await page.waitFor('#checkout-addresses-step button.continue');
  await page.click('#checkout-addresses-step button.continue');
  await page.waitFor('#checkout-delivery-step button.continue');
  await page.click('#checkout-delivery-step button.continue');
  await page.waitFor('#payment-option-1');
  await page.click('#payment-option-1');
  await page.waitFor('#conditions_to_approve\\5b terms-and-conditions\\5d');
  await page.click('#conditions_to_approve\\5b terms-and-conditions\\5d');
  await page.waitFor('#payment-confirmation button');
  await page.click('#payment-confirmation button', {clickCount: 2});
  await page.waitForNavigation({waitUntil: 'domcontentloaded'});

  await page.waitFor('#content-hook_order_confirmation h3');
  await page.$eval('#content-hook_order_confirmation h3', el => el.innerText).then((text) => {
    try {
      expect(text).to.contain('YOUR ORDER IS CONFIRMED');
      console.log('should check that the order is created');
    } catch (error) {
      console.log('Error: ' + error);
    }
  });
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9373
 */
open()
  .then(() => console.log('should open the browser'))
  .then(() => {
    accessToFo().then(async () => {
      await switchShopLanguageInFo('en');
      await searchProductInFo('T-shirt');
      await checkPaymentButtonInCheckout();
      await page.tracing.stop();
      await browser.close();
    });
  });