const authentication = require('../../common_scenarios/authentication');
const {Menu} = require('../../../selectors/BO/menu');

scenario('Get and check all selector per page', client => {
  test('should open the browser', async () => {
    await client.open();
    await client.startTracing('check');
  });
  test('should go to the authentication page', async () => {
    await client.openShopURL(global.adminFolderName);
    await client.waitFor(5000);
    await client.saveExcelFileIntoMongoDB();
    await client.checkNotEmptyCollection();
  });
  test('should compare all selectors elements of "Authentication" page', async () => {
    await client.waitFor(5000);
    await client.getSelectors('', 'authentification');
    await client.compareSelectors('', 'authentification');
    await client.signInBO();
  });
  test('should compare all selectors elements of "Dashboard" page', async () => {
    await client.waitFor(Menu.dashboard_menu, {visible: true, waitUntil: 'domcontentloaded'});
    await client.getSelectors('dashboard', 'dashboard');
    await client.compareSelectors('dashboard', 'dashboard');
  });
  authentication.signOutBO();
}, 'selectorsClient', true);