const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {SqlManagerPage} = require('../../selectors/BO/advancedParameters/databasePage');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9206
 */

scenario('PR-9206: Check the SQL manager page', () => {
  authentication.signInBO('9206');
  scenario('Add new SQL query', client => {
    test('should go to "SQL Manager" page', async () => {
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu);
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.database_submenu, 3000);
    });
    test('should click on "Add new SQL query" button', () => client.waitForAndClick(SqlManagerPage.add_new_sql_query_button, 2000));
    test('should set the "SQL query name" input', () => client.waitForAndType(SqlManagerPage.sql_query_name_input, 'ps_shop' + dateTime, 2000));
    test('should set the "SQL query" textarea', () => client.waitForAndType(SqlManagerPage.sql_query_textarea, 'select * from ps_shop', 2000));
    test('should click on "Save" button', () => client.waitForAndClick(SqlManagerPage.save_button, 2000));
  }, 'common_client');
  scenario('Search then check that the SQL query was well created', client => {
    test('should search for the created "SQL query"', () => client.searchByValue(SqlManagerPage.filter_sql_query_name_input, SqlManagerPage.filter_search_button, 'ps_shop' + dateTime));
    test('should check the appearance of created "SQL query" in the table', () => client.checkTextValue(SqlManagerPage.sql_query_name.replace('%S', 1), 'ps_shop' + dateTime, 'equal', 2000));
  }, 'common_client');
  scenario('Delete the created SQL query', client => {
    test('should click on "Dropdown" button then click on "Delete" action', async () => {
      await client.waitForAndClick(SqlManagerPage.sql_query_dropdown_button.replace('%S', 1));
      await client.confirmationDialog();
      await client.waitForAndClick(SqlManagerPage.sql_query_dropdown_action.replace('%S', 1).replace('%ACTION', 'delete'), 2000);
    });
    test('should check that the created "SQL query" does not exist in the table', () => client.checkTextValue(SqlManagerPage.no_records_found, 'No records found'));
    test('should click on "Reset" button', () => client.waitForAndClick(SqlManagerPage.filter_reset_button));
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);