module.exports = {
  SqlManagerPage: {
    add_new_sql_query_button: '#page-header-desc-request_sql-new_request',
    sql_query_name_input: '#name',
    sql_query_textarea: '#sql',
    save_button: '#request_sql_form_submit_btn',
    bulk_action_button: '#bulk_action_menu_request_sql',
    bulk_action_option_button: '#form-request_sql div.bulk-actions li:nth-child(%S) a',
    sql_manager_table: '#table-request_sql',
    get no_records_found() {
      return this.sql_manager_table + ' tbody div.list-empty-msg';
    },
    get sql_query_name() {
      return this.sql_manager_table + ' tr:nth-child(%S) > td:nth-child(3)';
    },
    get filter_sql_query_name_input() {
      return this.sql_manager_table + ' > thead input[name="request_sqlFilter_name"]';
    },
    get filter_search_button() {
      return '#submitFilterButtonrequest_sql';
    },
    get filter_reset_button() {
      return this.sql_manager_table + ' thead button[name="submitResetrequest_sql"]';
    },
    get sql_query_dropdown_button() {
      return this.sql_manager_table + ' tr:nth-child(%S) > td:nth-child(5) button.dropdown-toggle';
    },
    get sql_query_dropdown_action() {
      return this.sql_manager_table + ' tr:nth-child(%S) > td:nth-child(5) a.delete';
    }
  },
  DbBackupPage: {
    db_backup_table: '#backup_grid_panel'
  }
};