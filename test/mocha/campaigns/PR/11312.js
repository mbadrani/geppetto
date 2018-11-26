const authentication = require('../common_scenarios/authentication');
const onBoarding = require('../common_scenarios/onboarding');
const {Menu} = require('../../selectors/BO/menu');
const {ProductSettingsPage} = require('../../selectors/BO/shopParameters/productSettingsPage');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/11312
 */

scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/11312', () => {
  authentication.signInBO('11312');
  onBoarding.stopOnBoarding();
  scenario('Prevent short description limit to be set at 0', client => {
    test('should go to "Product Settings" page', async () => {
      await client.waitForAndClick(Menu.Configure.ShopParameters.shop_parameters_menu);
      await client.waitForAndClick(Menu.Configure.ShopParameters.product_settings_submenu, 1000);
    });
    test('should change the "Max size of short description" input to "0"', () => client.clearInputAndSetValue(ProductSettingsPage.ProductsGeneral.max_size_short_description_input, '0', 1000));
    test('should click on "Save" button', () => client.waitForAndClick(ProductSettingsPage.ProductsGeneral.save_button));
    test('should check that the short description is limited to 0', () => client.checkTextValue(ProductSettingsPage.ProductsGeneral.alert_text, 'The Max size of short description field is invalid.', 1000));
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);