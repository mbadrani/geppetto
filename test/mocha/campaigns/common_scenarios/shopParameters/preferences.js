const {Menu} = require('../../../selectors/BO/menu');
const {CommonBO} = require('../../../selectors/BO/commonBO');
const {PreferencesPage} = require('../../../selectors/BO/shopParameters/preferences');

module.exports = {
  async enableOrDisableMultistore (isEnabled = false) {
    scenario('Enable or disable multistore', client => {
      test('should go to "Preferences" page', async () => {
        await client.waitForAndClick(Menu.Configure.ShopParameters.shop_parameters_menu);
        await client.waitForAndClick(Menu.Configure.ShopParameters.general_submenu, 2000);
      });
      if (isEnabled) {
        test('should click on "No" button to disable multistore', () => client.waitForAndClick(PreferencesPage.enable_or_Disable_multistore_toggle_button.replace('%ID', 2)));
      } else {
        test('should click on "Yes" button to disable multistore', () => client.waitForAndClick(PreferencesPage.enable_or_Disable_multistore_toggle_button.replace('%ID', 4)));
      }
      test('should click on "Save" button', async () => {
        await client.isVisible(CommonBO.symfony_toolbar_close_button, 2000);
        if (global.visible) {
          await client.waitForAndClick(CommonBO.symfony_toolbar_close_button);
        }
        await client.waitForAndClick(PreferencesPage.save_button, 3000);
      });
    }, 'common_client');
  }
};