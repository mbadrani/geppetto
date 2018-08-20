module.exports = {
  SqlManagerPage: {
    add_new_sql_query_button: '#page-header-desc-configuration-add',
    sql_query_name_input: '#form_request_sql_name',
    sql_query_textarea: '#form_request_sql_sql',
    save_button: '#main-div div.card-footer > button',
    filter_sql_query_name_input: '#request_sql_name',
    sql_manager_table: '#request_sql_grid_table',
    get no_records_found() {
      return this.sql_manager_table + ' tbody tr:first-child p:nth-child(2)';
    },
    get sql_query_name() {
      return this.sql_manager_table + ' tr:nth-child(%S) > td:nth-child(3)';
    },
    get sql_query() {
      return this.sql_manager_table + ' tr:nth-child(%S) > td:nth-child(4)';
    },
    get filter_search_button() {
      return this.sql_manager_table + ' button[title="Search"]';
    },
    get filter_reset_button() {
      return this.sql_manager_table + ' thead button[type="reset"]';
    },
    get sql_query_dropdown_button() {
      return this.sql_manager_table + ' tr:nth-child(%S) > td:nth-child(5) a.dropdown-toggle';
    },
    get sql_query_dropdown_action() {
      return this.sql_manager_table + ' tr:nth-child(%S) > td:nth-child(5) a.dropdown-item[href*="%ACTION"]';
    }
  }
};