const authentication = require('../common_scenarios/authentication');
const product = require('../common_scenarios/catalog/product');
const {CommonBO} = require('../../selectors/BO/commonBO');
const {Menu} = require('../../selectors/BO/menu');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');
const {AddProduct} = require('../../selectors/BO/catalog/products/addProduct');

let productData = {
  name: 'P10956',
  reference: 'P10956',
  quantity: '30',
  type: 'standard',
  priceHT: '10',
  pictures: [
    '1.png',
    '2.jpg'
  ],
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10956
 */

scenario('PR-10956: Check the feature of the product in the Back Office', () => {
  authentication.signInBO('10956');
  product.createProduct(productData);
  scenario('Edit the created product then check feature', client => {
    test('should go to "Catalog" page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
      await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 1000);
    });
    test('should search for the created product by "Name"', () => client.waitForAndType(Catalog.filter_input.replace('%NAME', 'name'), productData.name + global.dateTime));
    test('should click on "Search" button', () => client.waitForAndClick(Catalog.submit_filter_button));
    test('should click on the "Name" of the resulted product', () => client.waitForAndClick(Catalog.searched_product_link));

    //First feature
    test('should click on "Add a feature" button', () => client.waitForAndClick(AddProduct.Basic_settings.add_feature_button, 3000));
    test('should choose "Color" feature from the dropdown list', async () => {
      await client.waitForAndClick(AddProduct.Basic_settings.feature_select_button.replace('%ID', 0), 2000);
      await client.waitForAndClick(AddProduct.Basic_settings.feature_select_option.replace('%ID', 0).replace('%OPTION', 4), 2000);
    });
    test('should choose the "White" pre-defined value from the dropdown list', () => client.waitForAndSelect(AddProduct.Basic_settings.predefined_value_select.replace('%ID', 0), '9', 2000));

    //Second feature
    test('should click on "Add a feature" button', () => client.waitForAndClick(AddProduct.Basic_settings.add_feature_button, 3000));
    test('should choose "Color" feature from the dropdown list', async () => {
      await client.waitForAndClick(AddProduct.Basic_settings.feature_select_button.replace('%ID', 1), 2000);
      await client.waitForAndClick(AddProduct.Basic_settings.feature_select_option.replace('%ID', 1).replace('%OPTION', 4), 2000);
    });
    test('should choose the "White" pre-defined value from the dropdown list', () => client.waitForAndSelect(AddProduct.Basic_settings.predefined_value_select.replace('%ID', 1), '9', 2000));
    scenario('Save the product then close the green validation', client => {
      test('should click on "Save" button', () => client.waitForAndClick(AddProduct.save_button));
      test('should check and close the green validation', async() => {
        await client.checkTextValue(AddProduct.validation_msg, 'Settings updated.');
        await client.waitForAndClick(AddProduct.close_validation_button);
      });
    }, 'common_client');
    scenario('Go to the product list then click on "Reset" button', client => {
      test('should go to "Catalog" page', () => client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 1000));
      test('should click on "Reset" button', () => client.waitForAndClick(Catalog.reset_filter_button, 2000, {visible: true}));
    }, 'common_client');
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);