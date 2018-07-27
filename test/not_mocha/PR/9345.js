const install = require('../installPrestashop.js');

/** This test is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9345
 *
 * Run this test without composer.json
 * Before running this test set the open_basedir value (ex open_basedir = '/var/www/html/Prestashop')
 */
async function run() {
  await install.installShop(true);
}