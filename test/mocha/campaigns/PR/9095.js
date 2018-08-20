const {Menu} = require('../../selectors/BO/menu');
const authentication = require('../common_scenarios/authentication');
const translations = require('../common_scenarios/improve/international/translations');
const {OrderSettingsPage} = require('../../selectors/BO/configure/shopParameters/orderSettingsPage');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9095
 */
scenario('PR-9095: Check that the translation successfuly work in "Order settings" page', () => {
  authentication.signInBO('9095');
  translations.editTranslationWithSearch('Gift options', 'Gift options settings');
  scenario('Check the fieldset "Gift options" is well translated', client => {
    test('should go to "Order settings" page', async () => {
      await client.waitForAndClick(Menu.Configure.ShopParameters.shop_parameters_menu);
      await client.waitForAndClick(Menu.Configure.ShopParameters.order_settings_submenu, 2000);
    });
    test('should check that the fieldset "Gift options" is well translated', () => client.checkTextValue(OrderSettingsPage.gift_options_fieldset, 'Gift options settings', 'contain'));
  }, 'common_client');
  translations.resetTranslationWithSearch('Gift options');
  authentication.signOutBO();
}, 'common_client', true);