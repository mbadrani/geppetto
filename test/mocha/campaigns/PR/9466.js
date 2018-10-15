const {AddProduct} = require('../../selectors/BO/catalog/products/addProduct');
const {Menu} = require('../../selectors/BO/menu');
const authentication = require('../common_scenarios/authentication');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');

let productData = {
  name: 'P1',
  reference: 'P9433',
  quantity: '30',
  priceHT: '10'
};


scenario('This scenario is based on the bug described in this PR: https://github.com/PrestaShop/PrestaShop/pull/9466', () => {
  authentication.signInBO('9466');
  scenario('Create a new product in the Back Office', client => {
    test('should go to "Catalog" page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
      await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 1000);
    });
    test('should click on "New product"', () => client.waitForAndClick(Catalog.add_new_button));
    test('should set the "Name" input', () => client.waitForAndType(AddProduct.Basic_settings.name_input, productData.name + global.dateTime));
    test('should set the "Reference" input', () => client.waitForAndType(AddProduct.Basic_settings.reference_input, productData.reference));
    test('should set the "Quantity" input', () => client.clearInputAndSetValue(AddProduct.Basic_settings.quantity_input, productData.quantity));
    test('should set the "Price" input', () => client.clearInputAndSetValue(AddProduct.Basic_settings.price_input, productData.priceHT));
    test('should close the symfony toolbar', async () => {
      await client.isVisible(AddProduct.symfony_toolbar, 7000);
      if (visible) {
        await client.waitForAndClick(AddProduct.symfony_toolbar);
      }
    });
    test('should click on "Online"', () => client.waitForAndClick(AddProduct.online_switcher));
    scenario('Add Attribute', client => {
      test('should select the "Product with combination" radio button', () => client.waitForAndClick(AddProduct.Basic_settings.combination_radio_button));
      test('should go to "Combinations" tab', () => client.waitForAndClick(AddProduct.quantity_combination_tab));
      test('should choose the combinations', async () => {
        await client.waitForAndClick(AddProduct.Combination.attribute_size_checkbox_button.replace('%ID', 1), 1000);
        await client.waitForAndClick(AddProduct.Combination.attribute_size_checkbox_button.replace('%ID', 2), 1000);
      });
      test('should click on "Generate" button', async () => {
        await client.checkBrowserMessage('');
        await client.waitForAndClick(AddProduct.Combination.generate_combination_button, 3000);
      });
      test('should verify the appearance of the green validation', async () => {
        await client.checkTextValue(AddProduct.validation_msg, 'Settings updated.');
        await client.waitForAndClick(AddProduct.close_validation_button);
      });
    }, 'common_client');
    test('should click on "Save" button', () => client.waitForAndClick(AddProduct.save_button, 3000));
    test('should check and close the green validation', async () => {
      await client.waitForAndClick(AddProduct.close_validation_button);
      await client.waitFor(5000);
    });
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);
