const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {StockPage} = require('../../selectors/BO/catalog/stocks/stock');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10260
 */
scenario('PR-10260: Check the "Help" button in the stock page', () => {
  authentication.signInBO('10260');
  scenario('Check that the "Help" button successfully work', client => {
    test('should go to "Stock" page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
      await client.waitForAndClick(Menu.Sell.Catalog.stocks_submenu);
    });
    test('should click on "Help" button', () => client.waitForAndClick(StockPage.help_button));
    test('should check that the "Help" sidebar is well opened', () => client.waitFor(StockPage.close_sidebar_button));
    test('should click on "Close" button of sidebar', () => client.waitForAndClick(StockPage.close_sidebar_button));
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);