const {HomePage} = require('../../selectors/FO/homePage');
const {SearchProduct} = require('../../selectors/FO/SearchPage');
const {ShoppingCartPage} = require('../../selectors/FO/shoppingCartPage');
const authentication = require('../common_scenarios/authentication');
const product = require('../common_scenarios/catalog/product');

let productData = {
  name: 'P1',
  reference: 'P9469',
  quantity: '12',
  priceHT: '20',
  type: 'standard',
  pictures: [
    '1.png',
    '2.jpg'
  ]
};

scenario('This scenario is based on the bug described in this PR https://github.com/PrestaShop/PrestaShop/pull/9469', () => {
  authentication.signInBO('9469');
  product.createProduct(productData);
  scenario('Check that the block "Specific References" does not appear', client => {
    test('should go to the Front office', () => client.openShopURL());
    test('should search for the created product', async () => {
      await client.waitForAndType(HomePage.search_input, productData.name + global.dateTime);
      await client.keyboardPress('Enter');
    });
    test('should go to the searched product page', () => client.waitForAndClick(SearchProduct.product_result_name));
    test('should check that "Specific References" does not appear', () => client.isNotExisting(ShoppingCartPage.specific_references));
  }, 'common_client');
}, 'common_client', true);
