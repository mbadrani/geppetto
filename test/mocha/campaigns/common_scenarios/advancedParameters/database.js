const {Menu} = require('../../../selectors/BO/menu');
const {SqlManagerPage} = require('../../../selectors/BO/advancedParameters/databasePage');

module.exports = {
  async createSqlQuery(sqlQueryData) {
    scenario('Add new SQL query', client => {
      test('should go to "SQL Manager" page', async () => {
        await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu);
        await client.waitForAndClick(Menu.Configure.AdvancedParameters.database_submenu, 3000);
      });
      test('should click on "Add new SQL query" button', () => client.waitForAndClick(SqlManagerPage.add_new_sql_query_button, 2000));
      test('should set the "SQL query name" input', () => client.waitForAndType(SqlManagerPage.sql_query_name_input, sqlQueryData.name, 2000));
      test('should set the "SQL query" textarea', () => client.waitForAndType(SqlManagerPage.sql_query_textarea, sqlQueryData.sql, 2000));
      test('should click on "Save" button', () => client.waitForAndClick(SqlManagerPage.save_button, 2000));
    }, 'common_client');
  },
  async deleteSqlQuery(sqlQueryData) {
    scenario('Search then check that the SQL query was well created', client => {
      test('should search for the created "SQL query"', () => client.searchByValue(SqlManagerPage.filter_sql_query_name_input, SqlManagerPage.filter_search_button, sqlQueryData.name));
      test('should check the appearance of created "SQL query" in the table', () => client.checkTextValue(SqlManagerPage.sql_query_name.replace('%S', 1), sqlQueryData.name, 'contain', 2000));
    }, 'common_client');
    scenario('Delete the created SQL query', client => {
      test('should click on "Dropdown" button then click on "Delete" action', async () => {
        await client.waitForAndClick(SqlManagerPage.sql_query_dropdown_button.replace('%S', 1));
        await client.confirmationDialog();
        await client.waitForAndClick(SqlManagerPage.sql_query_dropdown_action.replace('%S', 1).replace('%ACTION', 'delete'), 2000);
      });
      test('should click on "Reset" button', () => client.waitForAndClick(SqlManagerPage.filter_reset_button));
    }, 'common_client');
  },
  async deleteSqlQueryWithBulkAction() {
    scenario('Delete the created SQL query with bulk action', client => {
      test('should click on "Bulk action" button then click on "Select all" action', async () => {
        await client.waitForAndClick(SqlManagerPage.bulk_action_button);
        await client.waitForAndClick(SqlManagerPage.bulk_action_option_button.replace('%S', 1), 2000);
      });
      test('should click on "Bulk action" button then click on "Delete selected" action', async () => {
        await client.waitForAndClick(SqlManagerPage.bulk_action_button);
        await client.waitForAndClick(SqlManagerPage.bulk_action_option_button.replace('%S', 4), 2000);
      });
      test('should check that the created "SQL query" does not exist in the table', () => client.isExisting(SqlManagerPage.no_records_found, 4000));
    }, 'common_client');
  }
};