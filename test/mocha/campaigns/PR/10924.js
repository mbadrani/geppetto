const authentication = require('../common_scenarios/authentication');
const localization = require('../common_scenarios/improve/international/localization');
const install = require('../common_scenarios/install');
const onBoarding = require('../common_scenarios/onboarding');
const {Menu} = require('../../selectors/BO/menu');
const {CommonBO} = require('../../selectors/BO/commonBO');
const {Team} = require('../../selectors/BO/advancedParameters/teamPage');
const {Localization} = require('../../selectors/BO/improve/international/localization');
const {Attributes} = require('../../selectors/BO/catalog/attributesAndFeatures/attributes');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');
const {AddProduct} = require('../../selectors/BO/catalog/products/addProduct');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10924
 */

scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/10924', () => {
  authentication.signInBO('10924');
  onBoarding.stopOnBoarding();
  scenario('Edit the defaut language to "French"', client => {
    test('should go to "Localization" page', async () => {
      await client.waitForAndClick(Menu.Improve.International.international_menu);
      await client.waitForAndClick(Menu.Improve.International.localization_submenu, 1000);
    });
    test('should close the symfony toolbar', async () => {
      await client.waitFor(2000);
      await client.isVisible(CommonBO.symfony_toolbar_close_button, 2000);
      if (global.visible) {
        await client.waitForAndClick(CommonBO.symfony_toolbar_close_button);
      }
    });
    test('should change the default language to "French"', async () => {
      await client.waitForAndClick(Localization.Configuration.default_language);
      await client.waitForAndClick(Localization.Configuration.select_language.replace("%D", 2), 1000);
    });
    test('should click on "Save" button', () => client.waitForAndClick(Localization.Configuration.save_button, 1000));
  }, 'common_client');
  scenario('Change the language of the Back Office to "French"', client => {
    test('should go to "Team" page', async () => {
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu);
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.team_submenu, 1000);
    });
    test('should click on "Edit" button', () => client.waitForAndClick(Team.Employees.edit_button, 1000));
    test('should select the "French" language', () => client.waitForAndSelect(Team.Employees.language_select, '2', 1000));
    test('should click on "Save" button', () => client.waitForAndClick(Team.Employees.save_button, 1000));
  }, 'common_client');
  localization.deleteLanguage('English');
  scenario('Add a new value for "Color" attribute', client => {
    test('should go to "Attributes & Features" page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
      await client.waitForAndClick(Menu.Sell.Catalog.attributes_features_submenu, 1000);
    });
    test('should search for the color attribute', () => client.searchByValue(Attributes.filter_name_input, Attributes.filter_search_button, 'Couleur'));
    test('should click on "View" button', () => client.waitForAndClick(Attributes.view_button, 1000));
    test('should click on "Add new value" button', () => client.waitForAndClick(Attributes.add_new_value_button, 1000));
    test('should set the "Value" input', () => client.waitForAndType(Attributes.value_input, 'Salmon', 1000));
    test('should set the "Color" input', () => client.waitForAndType(Attributes.color_input, '#FA8072', 1000));
    test('should click on "Save" button', () => client.waitForAndClick(Attributes.save_button));
  }, 'common_client');
  scenario('Check that the new created value is in the list of the attributes in the product page', client => {
    test('should go to "Products" page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
      await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 1000);
    });
    test('should click on "New product" button', () => client.waitForAndClick(Catalog.add_new_button, 2000));
    test('should select the "Product with combination" radio button', () => client.waitForAndClick(AddProduct.Basic_settings.combination_radio_button));
    test('should go to "Combinations" tab', () => client.waitForAndClick(AddProduct.quantity_combination_tab));
    test('should Check that the new created value is in the list of the colors', () => client.isExisting(AddProduct.Combination.attribute_color_label.replace('%D', '#FA8072')));
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client');

scenario('Re-install the shop after making changes', () => {
  scenario('Open the browser then access to install page', client => {
    test('should open the browser', async () => {
      await client.open();
      await client.startTracing('10924');
    });
    test('should go to the install page', async () => {
      await client.openShopURL(global.installFolderName);
      await client.waitFor(5000);
    });
  }, 'common_client');
  install.installShop(global.language, ['en'], true);
}, 'common_client');
