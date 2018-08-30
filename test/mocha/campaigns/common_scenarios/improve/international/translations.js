const {Menu} = require('../../../../selectors/BO/menu');
const {TranslationsPage} = require('../../../../selectors/BO/improve/international/translationsPage');

module.exports = {
  async editTranslationWithSearch(searchValue, newValue) {
    scenario('Translate the fieldset "Gift options"', client => {
      test('should go to "Translations" page', async () => {
        await client.waitForAndClick(Menu.Improve.International.international_menu);
        await client.waitForAndClick(Menu.Improve.International.translations_submenu, 2000);
      });
      test('should select the "English" language from the list', () => client.waitForAndSelect(TranslationsPage.translations_languages_select, 'en', 2000));
      test('should click on "Modify" button', () => client.waitForAndClick(TranslationsPage.modify_button, 2000));
      test('should search for the fieldset "' + searchValue + '"', async () => {
        await client.waitForAndType(TranslationsPage.search_input, searchValue, 2000);
        await client.waitForAndClick(TranslationsPage.search_button, 2000);
      });
      test('should set the "Gift options" textarea', () => client.waitForAndType(TranslationsPage.gift_options_textarea, newValue, 5000));
      test('should click on "Save" button', () => client.waitForAndClick(TranslationsPage.save_button, 5000));
    }, 'common_client');
  },
  async resetTranslationWithSearch(searchValue) {
    scenario('Translate the fieldset "Gift options"', client => {
      test('should go to "Translations" page', async () => {
        await client.waitForAndClick(Menu.Improve.International.international_menu);
        await client.waitForAndClick(Menu.Improve.International.translations_submenu, 2000);
      });
      test('should select the "English" language from the list', () => client.waitForAndSelect(TranslationsPage.translations_languages_select, 'en', 2000));
      test('should click on "Modify" button', () => client.waitForAndClick(TranslationsPage.modify_button, 2000));
      test('should search for the fieldset "' + searchValue + '"', async () => {
        await client.waitForAndType(TranslationsPage.search_input, searchValue, 2000);
        await client.waitForAndClick(TranslationsPage.search_button, 2000);
      });
      test('should click on "Reset" button', () => client.waitForAndClick(TranslationsPage.reset_button, 2000));
      test('should click on "Save" button', () => client.waitForAndClick(TranslationsPage.save_button, 2000));
    }, 'common_client');
  }
};