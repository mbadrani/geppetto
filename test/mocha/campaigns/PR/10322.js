const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');
const {CommonBO} = require('../../selectors/BO/commonBO');
const {HomePage} = require('../../selectors/FO/homePage');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10322
 */
scenario('PR-10322: Check the sort of product with drag and drop', () => {
  authentication.signInBO('10322');
  scenario('Change the position of products with drag and drop', client => {
    test('should go to "Products" page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
      await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 4000);
    });
    test('should filter the products by category "Home"', async () => {
      await client.waitForAndClick(Catalog.filter_by_categories_button);
      await client.waitForAndClick(Catalog.home_category_radio_button, 4000);
    });
    test('should click on "Reorder" button', async () => {
      await client.isVisible(Catalog.product_filter_reorder_button, 2000);
      if (global.visible) {
        await client.waitForAndClick(Catalog.product_filter_reorder_button);
      }
    });
    test('should change the position of "' + client.stringifyNumber(3) + ' product" with drag and drop', async () => {
      await client.getTextInVar(Catalog.product_id.replace('%ID', 3), 'productId', 2000);
      await client.getTextInVar(Catalog.product_name.replace('%ID', 3), 'productName', 2000);
      await client.getTextInVar(Catalog.product_reference.replace('%ID', 3), 'productReference', 2000);
      await client.dragAndDrop(Catalog.product_id.replace('%ID', 3), Catalog.product_id.replace('%ID', 1));
    });
    test('should click on "Save & refresh" button', () => client.waitForAndClick(Catalog.product_filter_save_refresh_button, 2000));
    test('should verify the appearance of the green validation', () => client.checkTextValue(Catalog.success_message, 'Products successfully sorted.'));
    test('should check that the position of "' + client.stringifyNumber(3) + ' product" has been changed in the Back Office', async () => {
      await client.checkTextValue(Catalog.product_id.replace('%ID', 1), global.tab['productId'], 'equal', 2000);
      await client.checkTextValue(Catalog.product_name.replace('%ID', 1), global.tab['productName'], 'equal', 2000);
      await client.checkTextValue(Catalog.product_reference.replace('%ID', 1), global.tab['productReference'], 'equal', 2000);
    });
    test('should go to the Front Office', () => client.accessToFO(CommonBO.shopname_link, 1, 6000));
    test('should switch language to "English"', () => client.switchShopLanguageInFo('en'));
    test('should click on "All products" link', () => client.waitForAndClick(HomePage.all_product_link, 50));
    test('should check that the position of "' + client.stringifyNumber(3) + ' product" has been changed in the Front Office', () => client.checkAttributeValue('#js-product-list article:nth-child(1)', 'data-id-product', global.tab['productId'], 2000));
    test('should go back to the Back Office', async () => {
      await client.closeWindow();
      await client.switchWindow(0);
    });
    test('should reset the reorder of product', async () => {
      await client.waitFor(5000);
      await client.dragAndDrop(Catalog.product_id.replace('%ID', 3), Catalog.product_id.replace('%ID', 1));
      await client.dragAndDrop(Catalog.product_id.replace('%ID', 3), Catalog.product_id.replace('%ID', 1));
      await client.waitForAndClick(Catalog.product_filter_save_refresh_button, 4000);
    });
    test('should verify the appearance of the green validation then click on "Close" icon', async () => {
      await client.checkTextValue(Catalog.success_message, 'Products successfully sorted.');
      await client.waitForAndClick(Catalog.success_close_button);
    });
    test('should click on "' + client.stringifyNumber(3) + ' product" checkbox', () => client.waitForAndClick(Catalog.product_checkbox_button.replace('%ID', 1), 4000));
    test('should click on "Save & refresh" button', () => client.waitForAndClick(Catalog.product_filter_save_refresh_button, 4000));
    test('should verify the appearance of the green validation', () => client.checkTextValue(Catalog.success_message, 'Products successfully sorted.'));
    test('should reset the filter categories of product', async () => {
      await client.waitForAndClick(Catalog.filter_by_categories_button);
      await client.waitForAndClick(Catalog.unselect_button, 4000);
    });
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);