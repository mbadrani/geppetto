const authentication = require('../common_scenarios/authentication');
const product = require('../common_scenarios/catalog/product');

let productData = {
  name: 'P1',
  reference: 'P9433',
  quantity: '30',
  discount: '4',
  customization: 'customizationValue'
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9433
 */

scenario('PR-9433: Add customizations field in catalog whitelist', () => {
  authentication.signInBO('9433');
  product.createProduct(productData);
  product.searchProductInFo(productData);
  product.checkCustomizationInFO(productData, 'MessageCustomization');
  authentication.signOutBO();
}, 'common_client', true);
