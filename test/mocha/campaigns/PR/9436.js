const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {TaxesPage} = require('../../selectors/BO/improve/international/taxesPage');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9436
 */
scenario('PR-9436: Check the taxes of "Denmark" country', () => {
  authentication.signInBO('9436');
  scenario('Check the availability of taxes for Denmark', client => {
    test('should go to "Taxes" page', async () => {
      await client.waitForAndClick(Menu.Improve.International.international_menu);
      await client.waitForAndClick(Menu.Improve.International.taxes_submenu);
    });
    test('should search for "Denmark" taxes by name', () => client.searchByValue(TaxesPage.filter_name_input, TaxesPage.filter_search_button, 'DK') );
    test('should check that only be one available tax for "Denmark"', () => client.checkTextValue(TaxesPage.tax_number_span, '1', 'equal', 2000) );
    test('should check that the "Rate" of available tax for "Denmark" is equal to "25.000%"', () => client.checkTextValue(TaxesPage.tax_rate.replace('%S', 1), '25.000 %', 'contain', 2000) );
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);