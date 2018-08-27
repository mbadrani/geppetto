module.exports = {
  AddProduct: {
    quantity_combination_tab:'#tab_step3 > a',
    success_message: '#growls-default div.growl-message',
    save_button: 'button.js-btn-save[type=submit]',
    online_switcher: '.switch-input',
    symfony_toolbar: 'a[title="Close Toolbar"]',

    Basic_settings: {
      name_input: '#form_step1_name_1',
      combination_radio_button: '#show_variations_selector > div:nth-child(3) > label > input[type="radio"]',
      reference_input: '#form_step6_reference',
      quantity_input: '#form_step1_qty_0_shortcut',
      price_input: '#form_step1_price_shortcut',
    },

    Combination: {
      attributes_input: '#form_step3_attributes-tokenfield',
      first_attribute_select: '#attributes-generator div.tt-dataset  div:nth-child(1)',
      generate_combination_button: '#create-combinations',
      attribute_quantity_input: '#accordion_combinations > tr:nth-child(%NUMBER) > td.attribute-quantity  input',

    },

    Quantity: {
      default_behaviour_radio_button: '#form_step3_out_of_stock_2',
    }
  }
};
