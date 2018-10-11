const install = require('../common_scenarios/install');
const {Install} = require('../../selectors/install');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10109
 */

scenario('PR-10109: Install shop with Hindi language', () => {
  scenario('Open the browser then access to install page', client => {
    test('should open the browser', async () => {
      await client.open();
      await client.startTracing('10109');
    });
    test('should go to the install page', async () => {
      await client.openShopURL(global.installFolderName);
      await client.waitFor(90000);
      await client.getSelectedValue(Install.StepOne.language_select, 'hi');
      await install.installShop('hi', global.selectedValue, true);
    });
  }, 'common_client');
}, 'common_client');
