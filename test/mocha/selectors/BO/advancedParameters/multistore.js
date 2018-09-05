module.exports = {
  MultistorePage: {
    add_new_shop_button: '#page-header-desc-shop_group-new_2 > i',
    shop_name_input: '#name',
    save_button: '#shop_form_submit_btn',
    filter_shop_name_input: 'input[name="shopFilter_a!name"]',
    filter_search_button: '#submitFilterButtonshop',
    click_here_to_set_url_link: 'a.multishop_warning',
    shop_name_link: '#shops-tree li:nth-child(2) a',
    dropdown_toggle_button: '#table-shop button.dropdown-toggle',
    delete_action_button: '#table-shop a.delete',
    filter_reset_button: '#table-shop button[name="submitResetshop"]',
    edit_button: '#table-shop_group a.edit',
    MultistoreEditPage: {
      virtual_uri_input: '#virtual_uri',
      save_button: '#shop_url_form_submit_btn_1'
    },
    MultistoreTree: {
      shop_name: '#shops-tree li:nth-child(%D) > label > a',
      default_group: '#shops-tree span.tree-folder-name a'
    },
    ShopGroup: {
      share_available_quantities: '#fieldset_0 label[for="share_stock_%D"]',
      save_button: '#shop_group_form_submit_btn'
    }
  }
};
