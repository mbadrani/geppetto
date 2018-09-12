const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10375
 */

scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/10375', client => {
  authentication.signInBO('10375');
  scenario('This scenario is based on the bug described on this issue: https://github.com/PrestaShop/PrestaShop/issues/10321', client => {
    test('should go to "Products" page', async() => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
      await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 1000);
    });
    test('should click on "Filter by categories" button', () => client.waitForAndClick(Catalog.filter_by_categories_button));
    test('should check if "The tree is  reduced"', () => client.checkAttributeValue(Catalog.check_tree, 'class', 'more', 1000));
    test('should click on "Expand"', () => client.waitForAndClick(Catalog.expand_action));
    test('should check if "The tree is  developed"', () => client.checkAttributeValue(Catalog.check_tree, 'class', 'less', 1000));
    test('should click on "Collapse"', () => client.waitForAndClick(Catalog.collapse_action));
    test('should check if "The tree is  reduced"', () => client.checkAttributeValue(Catalog.check_tree, 'class', 'more', 1000));
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);
