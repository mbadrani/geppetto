const authentication = require('../common_scenarios/authentication');
const {Dashboard} = require('../../selectors/BO/dashboardPage');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10535
 */

scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/10535', () => {
  authentication.signInBO('10535');
  scenario('Check that the "Forge URL" is replaced with "GitHub issues" in "USEFUL LINKS"', client => {
    test('should check that "The Forge" is replaced with "GitHub"', () => client.checkTextValue(Dashboard.UsefulLinks.usefulLinksURL.replace('%D', 5), 'GitHub', 'equal', 2000));
    test('should check that "Report issues in the Bug Tracker" is replaced with "Report issues on GitHub"', () => client.checkTextValue(Dashboard.UsefulLinks.usefulLinksText.replace('%D', 5), 'Report issues on GitHub', 'equal', 2000));
    test('should get the URL of the GitHub issues', () => client.getAttributeInVar(Dashboard.UsefulLinks.usefulLinksURL.replace('%D', 5), 'href', 'gitHubIssuesLink', 1000));
  }, 'common_client');
  scenario('Check the URL of the GitHub issues page', client => {
    test('should click on "GitHub"', async () => {
      await client.waitForAndClick(Dashboard.UsefulLinks.usefulLinksURL.replace('%D', 5));
      await client.switchWindow(1);
    });
    test('should check the URL of the GitHub issues page', async () => {
      await client.checkURL(global.tab['gitHubIssuesLink']);
      await client.closeWindow();
      await client.switchWindow(0);
    });
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);