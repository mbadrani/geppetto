const authentication = require('../common_scenarios/authentication');
const onBoarding = require('../common_scenarios/onboarding');
const {Menu} = require('../../selectors/BO/menu');
const {EmailPage} = require('../../selectors/BO/advancedParameters/emailPage');
const {DbBackupPage} = require('../../selectors/BO/advancedParameters/databasePage');
const {LogsPage} = require('../../selectors/BO/advancedParameters/logsPage');
const {TraficAndSeo} = require('../../selectors/BO/shopParameters/trafficAndSeoPage');
const {Localisation} = require('../../selectors/BO/improve/international/localizationPage');
const {CommonBO} = require('../../selectors/BO/commonBO');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/11030
 */
scenario('PR-11030: Check that the pages of controllers that were migrated with new naming', () => {
  authentication.signInBO('11030');
  onBoarding.stopOnBoarding();
  scenario('Check that the pages of controllers successfully works', client => {
    test('should go to "Email" page', async () => {
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu);
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.email_submenu, 2000);
    });
    test('should check that the "Email" page is well opened', () => client.isExisting(EmailPage.email_table, 4000));
    test('should go to "Database" page', async () => {
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu);
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.database_submenu, 2000);
    });
    test('should click on "DB backup" tab', () => client.waitForAndClick(Menu.Configure.AdvancedParameters.db_backup_tab));
    test('should check that the "DB backup" page is well opened', () => client.isExisting(DbBackupPage.db_backup_table, 4000));

    test('should go to "Traffic & SEO" page', async () => {
      await client.waitForAndClick(Menu.Configure.ShopParameters.shop_parameters_menu);
      await client.isVisible(CommonBO.symfony_toolbar_close_button, 2000);
      if (global.visible) {
        await client.waitForAndClick(CommonBO.symfony_toolbar_close_button);
      }
      await client.waitForAndClick(Menu.Configure.ShopParameters.traffic_seo_submenu, 3000);
    });
    test('should check that the "SEO & URLs" page is well opened', () => client.isExisting(TraficAndSeo.SeoAndUrlsPage.seo_urls_table, 4000));

    test('should go to "Localization" page', async () => {
      await client.waitForAndClick(Menu.Improve.International.international_menu);
      await client.waitForAndClick(Menu.Improve.International.localization_submenu, 2000);
    });
    test('should check that the "Localization" page is well opened', () => client.isExisting(Localisation.LocalisationPage.impost_localization_pack_select, 4000));

    test('should click on "Geolocation" tab', () => client.waitForAndClick(Menu.Improve.International.geolocation_tab));
    test('should check that the "Geolocation" page is well opened', async () => {
      await client.isVisible(CommonBO.symfony_toolbar_close_button, 2000);
      if (global.visible) {
        await client.waitForAndClick(CommonBO.symfony_toolbar_close_button);
      }
      await client.isExisting(Localisation.GeolocationPage.geolocation_behavior_restricted_countries_select, 4000)
    });

    test('should go to "Logs" page', async () => {
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu);
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.logs_submenu, 2000);
    });
    test('should check that the "SEO & URLs" page is well opened', () => client.isExisting(LogsPage.logs_table, 4000));

  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);