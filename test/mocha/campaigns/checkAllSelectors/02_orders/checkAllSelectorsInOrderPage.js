const authentication = require('../../common_scenarios/authentication');
const {Menu} = require('../../../selectors/BO/menu');
const {OrderPage} = require('../../../selectors/BO/orders/orderPage');
const {CreateOrderPage} = require('../../../selectors/BO/orders/orderPage');

scenario('Get and check all selectors per page', () => {
  authentication.signInBO('checkOrderPage');
  scenario('Get and check all selectors of order pages', client => {
    test('should go to "Orders" page', async () => {
      await client.waitForAndClick(Menu.Sell.Orders.orders_menu);
      await client.waitForAndClick(Menu.Sell.Orders.orders_submenu, 2000);
      await client.waitFor(Menu.Sell.Orders.orders_submenu, {visible: true, waitUntil: 'domcontentloaded'});
      await client.getSelectors('orders', 'orders');
    });
    test('should click on "Add new order" button', async () => {
      await client.waitForAndClick(OrderPage.new_order_button, 2000);
      await client.waitFor(1000, {waitUntil: 'domcontentloaded'});
      await client.getSelectors('orders', 'orders');
    });
    test('should search for a customer then click on "Choose" button', async () => {
      await client.clearInputAndSetValue(CreateOrderPage.customer_search_input, 'john doe');
      await client.getSelectors('orders', 'orders');
      await client.waitForAndClick(CreateOrderPage.choose_customer_button, 2000);
    });
    test('should search for a product', async () => {
      await client.waitFor(1000, {waitUntil: 'domcontentloaded'});
      await client.getSelectors('orders', 'orders');
      await client.clearInputAndSetValue(CreateOrderPage.product_search_input, 'demo');
      await client.waitFor(3000);
      await client.getSelectors('orders', 'orders');
    });
    test('should click on "Add to cart" button', async () => {
      await client.waitFor(1000, {waitUntil: 'domcontentloaded'});
      await client.waitForAndClick(CreateOrderPage.add_to_cart_button, 2000);
      await client.getSelectors('orders', 'orders');
    });
    test('should click on "Create the order" button', async () => {
      await client.waitFor(1000, {waitUntil: 'domcontentloaded'});
      await client.getSelectors('orders', 'orders');
      await client.waitForAndClick(CreateOrderPage.create_order_button, 2000);
    });
    test('should wait until view order page is well displayed then compare all selectors of order pages', async () => {
      await client.waitFor(4000, {waitUntil: 'domcontentloaded'});
      await client.getSelectors('orders', 'orders');
      await client.compareSelectors('orders', 'orders');
    });
  }, 'selectorsClient');
  authentication.signOutBO();
}, 'selectorsClient', true);