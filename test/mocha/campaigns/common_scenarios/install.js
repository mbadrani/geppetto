const {Install} = require('../../selectors/install');

module.exports = {
  async installShop(language = 'undefined') {
    scenario('Install new shop', () => {
      // Select language
      scenario('Step 1 : Choose your language', client => {
        const lang = language === 'undefined' ? global.language : language;
        test('should choose the language "' + lang.toUpperCase() + '" from the list', () => client.waitForAndSelect(Install.StepOne.language_select, lang, 2000));
        test('should click on "Next" button', () => client.waitForAndClick(Install.Common.next_button));
      }, 'common_client');
      // Accept the terms and conditions
      scenario('Step 2 : License agreements', client => {
        test('should accept the terms and conditions', () => client.waitForAndClick(Install.StepTwo.terms_and_conditions_checkbox));
        test('should click on "Next" button', () => client.waitForAndClick(Install.Common.next_button));
      }, 'common_client');
      // Checking prestashop compatibility
      scenario('Step 3 : System compatibility', client => {
        test('should check that the "System compatibility" is in green', () => client.checkAttributeValue(Install.StepThree.system_compatibility_box, 'class', 'okBlock', 2000));
        test('should click on "Next" button', () => client.waitForAndClick(Install.Common.next_button));
      }, 'common_client');
      // Fill the store information form
      scenario('Step 4 : Store information', client => {
        test('should set the "Name" input of shop', () => client.waitForAndType(Install.StepFore.shop_name_input, 'puppeteerDemo', 2000));
        test('should choose the "Country" from the dropdown list', async () => {
          await client.waitForAndClick(Install.StepFore.country_select);
          await client.waitForAndType(Install.StepFore.country_search_input, global.country);
          await client.waitForAndClick(Install.StepFore.country_select);
        });
        test('should set the "Firstname" input', () => client.waitForAndType(Install.StepFore.firstname_input, global.firstName, 2000));
        test('should set the "Lastname" input', () => client.waitForAndType(Install.StepFore.lastname_input, global.lastName, 2000));
        test('should set the "Email" input', () => client.waitForAndType(Install.StepFore.email_input, global.email, 2000));
        test('should set the "Password" input', () => client.waitForAndType(Install.StepFore.password_input, global.password, 2000));
        test('should set the "Confirm password" input', () => client.waitForAndType(Install.StepFore.repeat_password_input, global.password, 2000));
        test('should click on "Next" button', () => client.waitForAndClick(Install.Common.next_button));
      }, 'common_client');
      // Fill the database configuration form
      scenario('Step 5 : System configuration', client => {
        test('should set the "Database server" input', () => client.waitForAndSetValue(Install.StepFive.database_server_input, global.dbServer, 3000));
        test('should set the "Database name" input', () => client.waitForAndSetValue(Install.StepFive.database_name_input, 'database' + global.dateTime, 1000));
        test('should set the "Database user" input', () => client.waitForAndSetValue(Install.StepFive.database_user_input, global.dbUser, 1000));
        test('should set the "Database password" input', () => client.waitForAndSetValue(Install.StepFive.database_password_input, global.dbPassword, 1000));
        test('should click on "Test your database connection now!" button', () => client.waitForAndClick(Install.StepFive.database_test_button));
        test('should click on "Create database" button', () => client.waitForAndClick(Install.StepFive.database_create_button, 3000));
        test('should check that the "Database" is well created', () => client.checkAttributeValue(Install.StepFive.database_created_box, 'class', 'okBlock', 3000));
        test('should click on "Next" button', () => client.waitForAndClick(Install.Common.next_button, 2000));
      }, 'common_client');
      // The installation is started
      scenario('Step 6 : Store installation', client => {
        test('should check that the "Create file parameters" is in green', () => client.waitFor(Install.StepSix.create_settings_file_step, {timeout: 360000}));
        test('should check that the "Create database tables" is in green', () => client.waitFor(Install.StepSix.install_database_step, {timeout: 360000}));
        test('should check that the "Create default shop and languages" is in green', () => client.waitFor(Install.StepSix.install_default_data_step, {timeout: 360000}));
        test('should check that the "Populate database tables" is in green', () => client.waitFor(Install.StepSix.create_database_table_step, {timeout: 360000}));
        test('should check that the "Configure shop information" is in green', () => client.waitFor(Install.StepSix.configure_shop_step, {timeout: 360000}));
        test('should check that the "Install demonstration data" is in green', () => client.waitFor(Install.StepSix.install_demonstration_data_step, {timeout: 360000}));
        test('should check that the "Install modules" is in green', () => client.waitFor(Install.StepSix.install_module_step, {timeout: 360000}));
        test('should check that the "Install addons modules" is in green', () => client.waitFor(Install.StepSix.install_addons_module_step, {timeout: 360000}));
        test('should check that the "Install theme" is in green', () => client.waitFor(Install.StepSix.install_theme_step, {timeout: 360000}));
        test('should check that the "Finish installation" is in green', () => client.waitFor(Install.StepSix.finish_installation_step, {timeout: 360000}));
      }, 'common_client');
    }, 'common_client');
  }
};