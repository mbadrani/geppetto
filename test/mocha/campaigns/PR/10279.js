const authentication = require('../common_scenarios/authentication');
const product = require('../common_scenarios/catalog/product');
const {ProductPageFO} = require('../../selectors/FO/productPage');
const {ShoppingCartPage} = require('../../selectors/FO/shoppingCartPage');

let productData = {
  name: 'P10279',
  reference: 'P10279',
  quantity: '30',
  type: 'standard',
  priceHT: '10',
  pictures: [
    '1.png',
    '2.jpg'
  ],
  quantities: {
    minimal_quantity: '3'
  }
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10279
 */
scenario('PR-10279: Check the minimal quantity on product page in the Front Office', () => {
  authentication.signInBO('10279');
  product.createProduct(productData);
  product.searchProductInFo(productData);
  scenario('Check the minimal quantity', client => {
    test('should check that the quantity of product is equal to "' + productData.quantities.minimal_quantity + '"', () => client.checkAttributeValue(ProductPageFO.quantity_wanted_input, 'value', productData.quantities.minimal_quantity, 'equal', 2000));
    test('should check that the minimal quantity of product is equal to "' + productData.quantities.minimal_quantity + '"', () => client.checkAttributeValue(ProductPageFO.quantity_wanted_input, 'value', productData.quantities.minimal_quantity, 'equal', 2000));
    test('should click on "ADD TO CART" button', () => client.waitForAndClick(ProductPageFO.add_to_cart_button, 2000));
    test('should click on "PROCEED TO CHECKOUT" button', () => client.waitForAndClick(ProductPageFO.proceed_to_checkout_modal_button, 2000));
    test('should check that the quantity of product is equal to "' + productData.quantities.minimal_quantity + '"', () => client.checkAttributeValue(ShoppingCartPage.quantity_input, 'value', productData.quantities.minimal_quantity, 'equal', 2000));
    test('should click on "Arrow up" button', () => client.waitForAndClick(ShoppingCartPage.arrow_button_up, 2000));
    test('should check that the number of items in cart contains "' + (parseInt(productData.quantities.minimal_quantity) + 1) + '"', () => client.checkTextValue(ShoppingCartPage.number_of_item_in_cart, (parseInt(productData.quantities.minimal_quantity) + 1), 'contain', 2000));
    test('should go back to the Back Office', () => client.switchWindow(0));
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);