module.exports = {
  Install: {
    Common: {
      next_button: '#btNext'
    },
    StepOne: {
      language_select: '#langList'
    },
    StepTwo: {
      terms_and_conditions_checkbox: '#set_license'
    },
    StepThree: {
      system_compatibility_box: '#sheet_system > h3'
    },
    StepFore: {
      shop_name_input: '#infosShop',
      country_select: '#infosCountry_chosen',
      country_search_input: '#infosCountry_chosen > div > div > input[type="text"]',
      firstname_input: '#infosFirstname',
      lastname_input: '#infosName',
      email_input: '#infosEmail',
      password_input: '#infosPassword',
      repeat_password_input: '#infosPasswordRepeat'
    },
    StepFive: {
      database_server_input: 'input#dbServer',
      database_name_input: 'input#dbName',
      database_user_input: 'input#dbLogin',
      database_password_input: 'input#dbPassword',
      database_test_button: '#btTestDB',
      database_create_button: '#btCreateDB',
      database_created_box: '#dbResultCheck'
    },
    StepSix: {
      create_settings_file_step: 'li[id=process_step_generateSettingsFile][class*="success"]',
      install_database_step: 'li[id=process_step_installDatabase][class*="success"]',
      install_default_data_step: 'li[id=process_step_installDefaultData][class*="success"]',
      create_database_table_step: 'li[id=process_step_populateDatabase][class*="success"]',
      configure_shop_step: 'li[id=process_step_configureShop][class*="success"]',
      install_demonstration_data_step: 'li[id=process_step_installFixtures][class*="success"]',
      install_module_step: 'li[id=process_step_installModules][class*="success"]',
      install_addons_module_step: 'li[id=process_step_installModulesAddons][class*="success"]',
      install_theme_step: 'li[id=process_step_installTheme][class*="success"]',
      finish_installation_step: '#install_process_success > div.clearfix > h2'
    }
  }
};