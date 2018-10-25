const authentication = require('../common_scenarios/authentication');
const onBoarding = require('../common_scenarios/onboarding');
const {LogsPage} = require('../../selectors/BO/advancedParameters/logsPage');
const {Menu} = require('../../selectors/BO/menu');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9324
 */
scenario('PR-9324: Check the SQL query action after adding a filter in logs page', () => {
  authentication.signInBO('9324');
  onBoarding.closeOnBoardingModal();
  onBoarding.stopOnBoarding();
  scenario('Check the value of SQL query', client => {
    test('should go to "Logs" page', async () => {
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu, 3000);
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.logs_submenu, 3000);
    });
    test('should set the "Id" filter input', () => client.waitForAndSetValue(LogsPage.filter_id_input, "2", 2000));
    test('should click on "Search" filter button', () => client.waitForAndClick(LogsPage.filter_search_button, 2000));
    test('should click on "Logs action" button', () => client.waitForAndClick(LogsPage.logs_action_button, 2000));
    test('should click on "Show SQL query" action button', () => client.waitForAndClick(LogsPage.show_sql_query_action, 2000));
    test('should check that the modal is well displayed', () => client.waitFor(LogsPage.show_query_modal, {timeout: 4000, visible: true}));
    test('should check that the value of SQL query is well displayed', () => client.checkTextareaValue(LogsPage.sql_query_textarea, 'SELECT l.*, e.email, CONCAT(e.firstname, \' \', e.lastname) as employee FROM ps_log l INNER JOIN ps_employee e ON l.id_employee = e.id_employee WHERE id_log LIKE \'%2%\' ORDER BY id_log desc LIMIT 10 OFFSET 0', 'equal', 3000));
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);