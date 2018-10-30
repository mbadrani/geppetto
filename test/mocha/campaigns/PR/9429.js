const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {AddProduct} = require('../../selectors/BO/catalog/products/addProduct');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');
const {ProductPageFO} = require('../../selectors/FO/productPage');
const {CommonBO} = require('../../selectors/BO/commonBO');

let productData = {
  name: 'Product',
  reference: 'P9429',
  quantity: '12',
  priceHT: '20',
  picture: [
    '1.png'
  ],
  file: [
    'prestashop_developer_guide.pdf'
  ]
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9429
 */

scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/9429', () => {
  authentication.signInBO('9429');
  scenario('Create a new product in the Back Office with an attached file', client => {
    test('should go to "Catalog" page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
      await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 1000);
    });
    test('should click on "New product" button', () => client.waitForAndClick(Catalog.add_new_button, 2000));
    test('should set the "Name" input', () => client.waitForAndType(AddProduct.Basic_settings.name_input, productData.name + global.dateTime));
    test('should set the "Reference" input', () => client.waitForAndType(AddProduct.Basic_settings.reference_input, productData.reference));
    test('should set the "Quantity" input', () => client.waitForAndType(AddProduct.Basic_settings.quantity_input, productData.quantity, 2000));
    test('should set the "Price" input', () => client.clearInputAndSetValue(AddProduct.Basic_settings.price_input, productData.priceHT));
    test('should upload the product picture', () => client.uploadFile(AddProduct.Basic_settings.files_input, dataFileFolder, productData.picture));
    test('should click on "Options" tab', () => client.waitForAndClick(AddProduct.options_tab, 2000));
    test('should attach a new file', async () => {
      await client.waitForAndClick(AddProduct.Options.attach_new_file_button);
      await client.uploadFile(AddProduct.Options.attachment_file, dataFileFolder, productData.file, 1000);
    });
    test('should close the symfony toolbar', async () => {
      await page.waitFor(2000);
      await client.isVisible(CommonBO.symfony_toolbar_close_button, 2000);
      if (global.visible) {
        await client.waitForAndClick(CommonBO.symfony_toolbar_close_button);
      }
    });
    test('should click on "Online"', () => client.waitForAndClick(AddProduct.online_switcher, 3000));
    test('should check and close the green validation', () => client.waitForAndClick(AddProduct.close_validation_button));
  }, 'common_client');
  scenario('Go to the Front Office and check that the created product is well displayed in the Front Office', client => {
    test('should click on "Preview" button', () => client.waitForAndClick(AddProduct.preview_button));
    test('should click on "Preview" link', async () => {
      await client.switchWindow(1);
      await client.waitForAndClick(AddProduct.preview_link);
    });
    test('should check the existence of the button "', () => client.isExisting(ProductPageFO.add_to_cart_button, 1000));
  }, 'common_client');
  scenario('Go back to the Back Office', client => {
    test('should go back  to the Back Office "', async () => {
      await client.closeWindow();
      await client.switchWindow(0);
    });
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);