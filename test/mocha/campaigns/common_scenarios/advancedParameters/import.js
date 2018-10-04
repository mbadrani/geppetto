const {CommonBO} = require('../../../selectors/BO/commonBO');
const {Menu} = require('../../../selectors/BO/menu');
const {ImportPage} = require('../../../selectors/BO/configure/advancedParameters/importPage');

module.exports = {
  async downloadSimpleFileCSV(fileName) {
    scenario('Check the available fields then download simple file of category', async client => {
      test('should close the symfony toolbar', async () => {
        await client.waitFor(CommonBO.symfony_toolbar_close_button, {visible: true});
        const exist = await page.$(CommonBO.symfony_toolbar_close_button, {visible: true});
        if (exist !== null) {
          await page.click(CommonBO.symfony_toolbar_close_button);
        }
      });
      test('should go to "Import" page', async () => {
        await client.scrollIntoView(Menu.Configure.AdvancedParameters.advanced_parameters_menu);
        await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu, 5000);
        await client.waitForAndClick(Menu.Configure.AdvancedParameters.import_submenu, 2000);
      });
      test('should check the appearance of available fields', () => client.checkAvailableFields(ImportPage.available_fields_block, 'response'));
      test('should click on "Simple categories file" button', async () => {
        await client.setDownloadBehavior();
        await client.waitForAndClick(ImportPage.simple_category_file_button, 2000, {visibility: true});
      });
      test('should check that the "' + fileName + '" file is well downloaded', () => client.checkDownloadFile(fileName));
    }, 'advancedParameters/importClient');
  },
  async checkModalConfirmation(fileName) {
    scenario('Check the appearance of confirmation dialog', async client => {
      test('should upload the downloaded file "' + fileName + '"', () => client.uploadFile(ImportPage.import_file_input, downloadFileFolder, fileName));
      test('should click on "Yes" to delete all categories before import', () => client.waitForAndClick(ImportPage.delete_all_categories_before_import_button, 2000));
      test('should check the appearance of confirmation dialog when we click on "Next step" button', () => client.checkDialog(ImportPage.next_step_button, 2000));
    }, 'advancedParameters/importClient');
  }
};