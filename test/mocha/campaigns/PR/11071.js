const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/11071
 */
scenario('PR-11071: Check that the checkbox successfully works at the first click', () => {
  authentication.signInBO('11071');
  scenario('Check that the checkbox successfully works in the product page', client => {
    test('should go to "Products" page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
      await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 4000);
    });
    test('should filter the products by category "Home"', async () => {
      await client.waitForAndClick(Catalog.filter_by_categories_button);
      await client.waitForAndClick(Catalog.home_category_radio_button, 4000);
    });
    test('should click on "Reorder" button', async () => {
      await client.isVisible(Catalog.product_filter_reorder_button, 10000);
      if (global.visible) {
        await client.waitForAndClick(Catalog.product_filter_reorder_button);
      }
    });
    test('should click on "' + client.stringifyNumber(1) + ' product" checkbox', () => client.waitForAndClick(Catalog.product_checkbox_button.replace('%ID', 1), 4000));
    test('should check that the "' + client.stringifyNumber(1) + ' product" is well selected', () => client.isSelected(Catalog.product_checkbox_input.replace('%ID', 1), 4000));
    test('should reset the filter categories of product', async () => {
      await client.waitForAndClick(Catalog.filter_by_categories_button);
      await client.waitForAndClick(Catalog.unselect_button, 4000);
    });
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);