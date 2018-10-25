const {HomePage} = require('../../../selectors/FO/homePage');
const {AccountPage} = require('../../../selectors/FO/accountPage');

module.exports = {
  async createCustomerFO(customerData) {
    scenario('Create "Customer"', client => {
      test('should click on "Sign in" button ', () => client.waitForAndClick(HomePage.sign_in_button));
      test('should click on "No account"', () => client.waitForAndClick(AccountPage.click_no_account));
      test('should set the "First name" input', () => client.waitForAndSetValue(AccountPage.first_name_input, customerData.first_name));
      test('should set the "Last name" input', () => client.waitForAndSetValue(AccountPage.last_name_input, customerData.last_name));
      test('should set the "Email" input', () => client.waitForAndSetValue(AccountPage.email_address_input, global.dateTime + customerData.email_address));
      test('should set the "Password" input', () => client.waitForAndSetValue(AccountPage.password_input, customerData.password));
      test('should click on "Save" button', () => client.waitForAndClick(AccountPage.save_button));
    }, 'common_client');
  }
}