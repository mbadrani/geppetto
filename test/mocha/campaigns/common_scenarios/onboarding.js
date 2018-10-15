const {Dashboard} = require('../../selectors/BO/dashboardPage');

module.exports = {
  async closeOnBoardingModal() {
    scenario('Close the onboarding modal if exist', client => {
      test('should successfully close the onboarding modal if exist', async () => {
        await client.waitFor(15000, {waitUntil: 'domcontentloaded'});
        await client.isVisible(Dashboard.welcome_modal, 3000, {timeout: 90000, visible: true});
        if (visible) {
          await client.waitForAndClick(Dashboard.welcome_modal);
        }
      });
    }, 'common_client');
  },
  async stopOnBoarding() {
    scenario('Stop the onboarding if exist', client => {
      test('should successfully stop the "Onboarding" if exist', async () => {
        await client.waitFor(7000, {waitUntil: 'domcontentloaded'});
        await client.isVisible(Dashboard.onbording_stop_button, 2000);
        if (global.visible) {
          await client.waitForAndClick(Dashboard.onbording_stop_button);
        }
      });
    }, 'common_client');
  }
};