const {HomePage} = require('../../selectors/FO/homePage');
const {OrderHistoryPage} = require('../../selectors/FO/order/orderHistoryPage');

scenario('This scenario is based on the bug described on his PR: https://github.com/PrestaShop/PrestaShop/pull/9367', () => {
  scenario('Login in the Front Office', client => {
    test('should open the browser', async () => {
      await client.open();
      await client.startTracing('9367');
    });
    test('should go to the Front office', () => client.openShopURL());
    test('should login successfully in the Front office', () => client.signInFO());
  }, 'common_client');
  scenario('Login in the Front Office', client => {
    test('should set the language of shop to "English"', () => client.switchShopLanguageInFo('en'));
    test('should click on "ORDER HISTORY AND DETAILS"', () => client.waitForAndClick(HomePage.order_history_and_details_button));
    test('should click on "DETAILS" button of the first order', () => client.waitForAndClick(OrderHistoryPage.details_button.replace('%P', 1).replace('%D', 1)));
    test('should check that the url does not contain the language', () => client.checkURL('en'));
    test('should logout successfully from the Front office', () => client.signOutFO());
  }, 'common_client');
}, 'common_client', true);
