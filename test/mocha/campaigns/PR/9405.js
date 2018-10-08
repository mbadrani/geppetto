const {ProductPageFO} = require('../../selectors/FO/productPage');
const {HomePage} = require('../../selectors/FO/homePage');
const {CheckoutOrderPage} = require('../../selectors/FO/order/checkoutOrderPage');
const authentication = require('../common_scenarios/authentication');
let quantity = '0';

scenario('This scenario is based on the bug described on his PR: https://github.com/PrestaShop/PrestaShop/pull/9405', () => {
  authentication.openShop('9405');
  scenario('Check the existence of the "block cart modal"', client => {
    test('should set the language of shop to "English"', () => client.switchShopLanguageInFo('en'));
    test('should go to the first product page', () => client.waitForAndClick(ProductPageFO.first_product));
    test('should set the quantity input by clicking on "arrow up button"', () => client.waitForAndClick(CheckoutOrderPage.arrow_button_up));
    test('should click on "ADD TO CART" button', () => client.waitForAndClick(ProductPageFO.add_to_cart_button));
    test('should click on "PROCEED TO CHECKOUT" button', () => client.waitForAndClick(ProductPageFO.proceed_to_checkout_modal_button, 2000, {visible: true}));
    test('should set the quantity equal to ' + quantity, async () => {
      await client.waitFor(4000);
      await client.eval(CheckoutOrderPage.quantity_input, quantity);
      await client.waitForAndClick(CheckoutOrderPage.quantity_input);
      await client.keyboardPress('Enter');
    });
    test('should check that the quantity is equal to ' + quantity, () => client.checkTextValue(CheckoutOrderPage.cart_products_count, quantity, 'contain', 2000));
    test('should check that the "Shopping cart" is emtpy', () => client.isExisting(CheckoutOrderPage.cart_product_no_item, 2000));
    test('should go to the "Home" page', () => client.waitForAndClick(HomePage.logo_home_page));
    test('should go to the first product page', () => client.waitForAndClick(ProductPageFO.first_product));
    test('should click on "ADD TO CART" button', () => client.waitForAndClick(ProductPageFO.add_to_cart_button));
    test('should check the existence of the "block cart modal"', () => client.isExisting(CheckoutOrderPage.block_cart, 3000));
  }, 'common_client');
}, 'common_client', true);
