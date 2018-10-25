const authentication = require('../common_scenarios/authentication');
const customer = require('../common_scenarios/customers/customers');
const {AccountPage} = require('../../selectors/FO/accountPage');

let customerData = {
  first_name: 'test',
  last_name: 'test',
  email_address: 'test@test.test',
  password: '123'
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10643
 */

scenario('This scenario is based on the bug described on this PR: https://github.com/PrestaShop/PrestaShop/pull/10643', () => {
  authentication.openShop('10643');
  scenario('Set the language of shop to "English"', client => {
    test('should set the language of shop to "English"', () => client.switchShopLanguageInFo('en'));
  }, 'common_client');
  customer.createCustomerFO(customerData);
  scenario('Check the password validation message', client => {
    test('should check the password validation message', () => client.checkValidationInput(AccountPage.password_input, 'At least 5 characters long'));
  }, 'common_client');
}, 'common_client', true);