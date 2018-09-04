const install = require('../common_scenarios/install');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10105
 */
scenario('PR-10105: Install shop with Bosnian language', () => {
  scenario('Open the browser then access to install page', client => {
    test('should open the browser', async () => {
      await client.open();
      await client.startTracing('10105');
    });
    test('should go to the install page', () => client.openShopURL(global.installFolderName));
  }, 'common_client');
  install.installShop('bs');
}, 'install', true);
