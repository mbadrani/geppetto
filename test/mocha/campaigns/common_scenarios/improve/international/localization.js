const {Menu} = require('../../../../selectors/BO/menu');
const {Localization} = require('../../../../selectors/BO/improve/international/localization');

module.exports = {
  async deleteLanguage(name) {
    scenario('Delete the created "Language"', client => {
      test('should go to "Localization" page', async () => {
        await client.waitForAndClick(Menu.Improve.International.international_menu);
        await client.waitForAndClick(Menu.Improve.International.localization_submenu, 1000);
      });
      test('should click on "Languages" tab', () => client.waitForAndClick(Menu.Improve.International.languages_tab));
      test('should search for the created language', () => client.searchByValue(Localization.Languages.filter_name_input, Localization.Languages.filter_search_button, name));
      test('should click on "Dropdown" button then click on "Delete" action', async () => {
        await client.waitForAndClick(Localization.Languages.dropdown_button);
        await client.confirmationDialog();
        await client.waitForAndClick(Localization.Languages.delete_button);
      });
      test('should click on "Reset" button', () => client.waitForAndClick(Localization.Languages.reset_button));
    }, 'common_client');
  }
};