const {Menu} = require('../../../selectors/BO/menu');
const {MultistorePage} = require('../../../selectors/BO/advancedParameters/multistore');
const {Dashboard} = require('../../../selectors/BO/dashboardPage');

/**
 * @param shopData
 * let shopData = {
 *  name: 'shop name' (required),
 *  virtual_url: 'virtual shop url' (optional),
 * };
 */
module.exports = {
  async createShop(shopData) {
    scenario('Create a new shop', client => {
      test('should go to "Multistore" page', async () => {
        await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu);
        await client.waitForAndClick(Menu.Configure.AdvancedParameters.multistore_submenu, 2000);
      });
      test('should click on "Add a new shop" button', () => client.waitForAndClick(MultistorePage.add_new_shop_button));
      test('should set the "Name" input', () => client.waitForAndType(MultistorePage.shop_name_input, shopData.name));
      test('should click on "Save" button', () => client.waitForAndClick(MultistorePage.save_button));
    }, 'common_client');
  },
  async editUrlShopWithSearch(shopData) {
    scenario('Search then edit URL of the created shop', client => {
      test('should search for the created shop "' + shopData.name + '"', async () => {
        await client.waitForAndType(MultistorePage.filter_shop_name_input, shopData.name);
        await client.waitForAndClick(MultistorePage.filter_search_button, 2000);
      });
      test('should click on "Click here to set a URL for this shop." link', () => client.waitForAndClick(MultistorePage.click_here_to_set_url_link));
      test('should set the "Virtual URL" input', () => client.waitForAndType(MultistorePage.MultistoreEditPage.virtual_uri_input, shopData.virtual_url, 2000));
      test('should click on "Save" button', () => client.waitForAndClick(MultistorePage.MultistoreEditPage.save_button));
    }, 'common_client');
  },
  async deleteShopWithSearch(shopData) {
    scenario('Search then delete the created shop', client => {
      test('should go to "Multistore" page', async () => {
        await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu);
        await client.waitForAndClick(Menu.Configure.AdvancedParameters.multistore_submenu, 2000);
      });
      test('should search for the created shop "' + shopData.name + '"', async () => {
        await client.waitForAndClick(MultistorePage.shop_name_link, 2000);
        await client.waitForAndSetValue(MultistorePage.filter_shop_name_input, shopData.name, 2000);
        await client.waitForAndClick(MultistorePage.filter_search_button, 2000);
      });
      test('should click on "Delete" action from the dropdown list', async () => {
        await client.waitForAndClick(MultistorePage.dropdown_toggle_button);
        await client.confirmationDialog();
        await client.waitForAndClick(MultistorePage.delete_action_button, 1000);
      });
      test('should click on "Reset" button', () => client.waitForAndClick(MultistorePage.filter_reset_button, 2000));
    }, 'common_client');
  },
  async switchToAllShops(client) {
    test('should switch to "All shops"', async () => {
      await client.waitForAndClick(Dashboard.multistore_shop_name);
      await client.waitForAndClick(Dashboard.click_all_shops);
    });
  },
  async enableAndDisableShareAvailableQuantites(isEnable = false) {
    scenario((isEnable ? 'Disable' : 'Enable') + ' share available quantities between group stores', client => {
      test('should go to "Multistore" page', async () => {
        await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu, 4000);
        await client.waitForAndClick(Menu.Configure.AdvancedParameters.multistore_submenu, 2000);
      });
      test('should click on "Default" group', () => client.waitForAndClick(MultistorePage.MultistoreTree.default_group));
      test('should click on "Edit" button', () => client.waitForAndClick(MultistorePage.edit_button));
      if (isEnable) {
        test('should disable "Share available quantities to sell"', () => client.waitForAndClick(MultistorePage.ShopGroup.share_available_quantities.replace("%D", "off")));
      }
      else {
        test('should enable "Share available quantities to sell"', () => client.waitForAndClick(MultistorePage.ShopGroup.share_available_quantities.replace("%D", "on")));
      }
      test('should click on "Save" button', () => client.waitForAndClick(MultistorePage.ShopGroup.save_button));
    }, 'common_client');
  }
};
