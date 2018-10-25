module.exports = {
  AddProduct: {
    quantity_combination_tab: '#tab_step3 > a',
    options_tab: '#tab_step6 > a',
    success_message: '#growls-default div.growl-message',
    save_button: 'button.js-btn-save[type=submit]',
    online_switcher: '.switch-input',
    symfony_toolbar: 'a[title="Close Toolbar"]',
    close_validation_button: '.growl-close',
    validation_msg: '#growls-default > .growl-notice > .growl-message:not(:empty)',
    preview_button: '#product_form_preview_btn',
    preview_link: 'body > a',

    Basic_settings: {
      name_input: '#form_step1_name_1',
      combination_radio_button: '#show_variations_selector > div:nth-child(3) > label > input[type="radio"]',
      simple_product_radio_button: '#show_variations_selector > div:nth-child(2) > label input',
      reference_input: '#form_step6_reference',
      quantity_input: '#form_step1_qty_0_shortcut',
      price_input: '#form_step1_price_shortcut',
      files_input: 'input.dz-hidden-input[type="file"]'
    },

    Combination: {
      attributes_input: '#form_step3_attributes-tokenfield',
      first_attribute_select: '#attributes-generator div.tt-dataset  div:nth-child(1)',
      generate_combination_button: '#create-combinations',
      attribute_quantity_input: '#accordion_combinations > tr:nth-child(%NUMBER) > td.attribute-quantity  input',
      attribute_size_checkbox_button: '#attribute-group-1 div.attribute:nth-child(%ID) span',
      combination_tr: '#accordion_combinations > tr:nth-child(%POS)',
      edit_combination_icon: '#attribute_%ID > td.attribute-actions a',
      combination_image: '#combination_%ID_id_image_attr > div:nth-child(%POS) > img',
      combination_image_number: '#combination_form_%ID small.number-of-images'
    },

    Quantity: {
      default_behaviour_radio_button: '#form_step3_out_of_stock_2',
      minimal_quantity_input: '#form_step3_minimal_quantity'
    },

    Options: {
      add_customization_button: '#custom_fields > a',
      customization_input: '#form_step6_custom_fields_0_label_1',
      attach_new_file_button: '#step6 a.mb-3',
      attachment_file: '#form_step6_attachment_product_file'
    }
  }
};
