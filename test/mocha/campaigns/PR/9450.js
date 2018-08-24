const authentication = require('../common_scenarios/authentication');
const preferences = require('../common_scenarios/shopParameters/preferences');
const multistore = require('../common_scenarios/advancedParameters/multistore');
const {Menu} = require('../../selectors/BO/menu');
const {Dashboard} = require('../../selectors/BO/dashboardPage');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9450
 */
let shopData = {
  name: 'secondShop',
  virtual_url: 'secondShop'
};

scenario('PR-9450: Check the admin base URL in multistore', () => {
  authentication.signInBO('9450');
  scenario('Check the visibility of the onboarding', client => {
    test('should close the "Onboarding" if exists', async () => {
      await client.isVisible(Dashboard.onbording_stop_button, 2000);
      if (global.visible) {
        await client.waitForAndClick(Dashboard.onbording_stop_button);
      }
    });
  }, 'common_client');
  preferences.enableOrDisableMultistore();
  multistore.createShop(shopData);
  multistore.editUrlShopWithSearch(shopData);
  scenario('Check the base url of the second shop in the Back Office', client => {
    test('should get the base url of the default shop', () => client.getBaseUrl('defaultShopUrl'));
    test('should choose the second shop from the list', () => client.switchShop('Second shop'));
    test('should go to "Category" page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
      await client.waitForAndClick(Menu.Sell.Catalog.category_submenu);
      await client.getBaseUrl('secondShopUrl');
    });
    test('should check that the base url of the second shop is equal to the default shop', async () => {
      await expect(tab['defaultShopUrl'].split('?')[0]).to.equal(tab['secondShopUrl'].split('?')[0])
    });
    test('should choose the all shop from the list', () => client.switchShop());
  }, 'common_client');
  multistore.deleteShopWithSearch(shopData);
  preferences.enableOrDisableMultistore(true);
  authentication.signOutBO();
}, 'common_client', true);