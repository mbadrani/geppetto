module.exports = {
  Catalog: {
    add_new_button: '#page-header-desc-configuration-add',
    filter_input: '#product_catalog_list  thead[class="with-filters"] input[name="filter_column_%NAME"]',
    submit_filter_button: '#product_catalog_list  thead[class="with-filters"] button[name="products_filter_submit"]',
    searched_product_link: '#product_catalog_list td:nth-child(4) > a',
    reset_filter_button: '#product_catalog_list  thead[class="with-filters"] button[name="products_filter_reset"]',
    tools_button: '#catalog-tools-button',
    import_button: '#desc-product-import',
    filter_by_categories_button: '#product_catalog_category_tree_filter',
    home_category_radio_button: '#product_categories_categories > ul > li > div input',
    unselect_button: '#product_catalog_category_tree_filter_reset',
    product_table: '#product_catalog_list table.product',
    get product_checkbox_button() {
      return this.product_table + ' tbody tr:nth-child(%ID) td:nth-child(1)';
    },
    get product_checkbox_input() {
      return this.product_table + ' tbody tr:nth-child(%ID) td:nth-child(1) input';
    },
    get product_id() {
      return this.product_table + ' tbody tr:nth-child(%ID) td:nth-child(2) > label';
    },
    get product_name() {
      return this.product_table + ' tbody tr:nth-child(%ID) td:nth-child(4) a';
    },
    get product_reference() {
      return this.product_table + ' tbody tr:nth-child(%ID) td:nth-child(5)';
    },
    get product_category() {
      return this.product_table + ' tbody tr:nth-child(%ID) td:nth-child(6)';
    },
    get product_price() {
      return this.product_table + ' tbody tr:nth-child(%ID) td:nth-child(7) a';
    },
    get product_quantity() {
      return this.product_table + ' tbody tr:nth-child(%ID) td:nth-child(8) a';
    },
    get product_status() {
      return this.product_table + ' tbody tr:nth-child(%ID) td:nth-child(8) a';
    },
    get product_filter_name_input() {
      return this.product_table + ' input[name="filter_column_name"]';
    },
    get product_filter_reference_input() {
      return this.product_table + ' input[name="filter_column_reference"]';
    },
    get product_filter_category_input() {
      return this.product_table + ' input[name="filter_column_name_category"]';
    },
    get product_filter_search_button() {
      return this.product_table + ' button[name="products_filter_submit"]';
    },
    get product_filter_reset_button() {
      return this.product_table + ' button[name="products_filter_reset"]';
    },
    get product_filter_reorder_button() {
      return this.product_table + ' input[value="Reorder"]';
    },
    get product_filter_save_refresh_button() {
      return '#bulk_edition_save_keep';
    },
    success_message: 'div.alert-success div.alert-text',
    success_close_button: 'div.alert-success button.close'
  }
};
