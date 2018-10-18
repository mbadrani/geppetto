const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {InvoicesPage} = require('../../selectors/BO/orders/invoicesPage');
const {CommonBO} = require('../../selectors/BO/commonBO');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10936
 */
scenario('PR-10936: Check the existence of red validation after clicking on "Generate PDF file by status"', () => {
  authentication.signInBO('10936');
  scenario('Check the existence of red validation', client => {
    test('should go to "Invoices" page', async () => {
      await client.waitForAndClick(Menu.Sell.Orders.orders_menu, 2000);
      await client.waitForAndClick(Menu.Sell.Orders.invoices_submenu, 2000);
    });
    test('should close the symfony toolbar', async () => {
      await client.isVisible(CommonBO.symfony_toolbar_close_button, 7000);
      if (visible) {
        await client.waitForAndClick(CommonBO.symfony_toolbar_close_button);
      }
    });
    test('should click on "Generate PDF file by status" button', () => client.waitForAndClick(InvoicesPage.generate_pdf_file_by_status_button));
    test('should verify the appearance of the red validation', () => client.checkTextValue(InvoicesPage.red_message_box, "×\nYou must select at least one order status.", 'equal', 2000));
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);