const install = require('../common_scenarios/install');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10107
 */
scenario('PR-10107: Install shop with Uzbek language', () => {
  scenario('Open the browser then access to install page', client => {
    test('should open the browser', async () => {
      await client.open();
      await client.startTracing('10107');
    });
    test('should go to the install page', () => client.openShopURL(global.installFolderName));
  }, 'common_client');
  install.installShop('uz');
}, 'install', true);