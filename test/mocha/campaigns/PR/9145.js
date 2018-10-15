const authentication = require('../common_scenarios/authentication');
const multistore = require('../common_scenarios/advancedParameters/multistore');
const order = require('../common_scenarios/orders/order');
const product = require('../common_scenarios/catalog/product');
const {CommonBO} = require('../../selectors/BO/commonBO');
const {Menu} = require('../../selectors/BO/menu');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');
const {OrderPage} = require('../../selectors/BO/orders/orderPage');
const {AddProduct} = require('../../selectors/BO/catalog/products/addProduct');
const preferences = require('../common_scenarios/shopParameters/preferences');
const install = require('../common_scenarios/install');
const onBoarding = require('../common_scenarios/onboarding');

let shopData = {
  name: 'secondShop',
  virtual_url: 'secondShop'
};
let productData = {
  name: 'P1',
  reference: 'PR123456789',
  quantity: "10",
  type: 'combination',
  priceHT: '50',
  pictures: [
    '1.png',
    '2.jpg'
  ],
  combinationsQuantities: {
    firstQuantity: '300',
    secondQuantity: '200'
  }
};

scenario('This scenario is based on the bugs described on this PR: https://github.com/PrestaShop/PrestaShop/pull/9145', () => {

  /**
   * This scenario is based on the bug described in this ticket
   * http://forge.prestashop.com/browse/BOOM-4050
   **/

  scenario('This scenario is based on the bug described on this BOOM: https://forge.prestashop.com/browse/BOOM-4050', () => {
    authentication.signInBO('9145');
    onBoarding.closeOnBoardingModal();
    preferences.enableOrDisableMultistore();
    multistore.createShop(shopData);
    multistore.editUrlShopWithSearch(shopData);
    scenario('Go to the Front Office', client => {
      test('should go to "Dashboard" page', async () => {
        await client.waitForAndClick(Menu.dashboard_menu);
        await client.waitFor(5000);
      });
      test('should go to the "Front Office"', async () => {
        await client.waitForAndClick(CommonBO.multistore_link, 4000);
        await client.waitForAndClick(CommonBO.link_shop.replace('%D', 3), 4000);
        await client.switchWindow(1, 10000);
      });
      test('should set the language of shop to "English"', () => client.switchShopLanguageInFo('en'));
    }, 'common_client');
    order.createOrderFO();
    authentication.signOutFO();
    scenario('Change the status of the order to shipped in the multistore context', client => {
      test('should go back  to the Back office', async () => {
        await client.closeWindow();
        await client.switchWindow(0);
      });
      multistore.switchToAllShops(client);
      test('should go to the orders page', async () => {
        await client.waitForAndClick(Menu.Sell.Orders.orders_menu, 2000);
        await client.waitForAndClick(Menu.Sell.Orders.orders_submenu, 1000);
      });
      test('should go to the created order', () => client.waitForAndClick(OrderPage.view_order_button.replace('%D', 1)));
      test('should change the status of the order to "shipped"', async () => {
        await client.waitForAndClick(OrderPage.choose_order_status);
        await client.waitForAndClick(OrderPage.order_status.replace('%D', 13), 1000);
      });
      test('should click on "UPDATE STATUS" button', () => client.waitForAndClick(OrderPage.update_status_button));
      test('should check that the status is well updated', () => client.checkTextValue(OrderPage.check_order_status.replace('%D', 1), 'Shipped', 'contain'));
      test('should close the "Orders" menu', () => client.waitForAndClick(Menu.Sell.Orders.orders_menu, 4000));
    }, 'common_client');
  }, 'common_client');

  /**
   * This scenario is based on the bug described in this ticket
   * http://forge.prestashop.com/browse/BOOM-3495 (not resolved: https://github.com/PrestaShop/PrestaShop/issues/10274)
   **/

  scenario('This scenario is based on the bug described on this BOOM: https://forge.prestashop.com/browse/BOOM-3495', () => {
    multistore.enableAndDisableShareAvailableQuantites();
    product.createProduct(productData);
    scenario('Check that quantities are well saved', client => {
      test('should go to "Catalog" page', async () => {
        await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
        await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 1000);
      });
      test('should search for the created product by "Name"', () => client.waitForAndType(Catalog.filter_input.replace('%NAME', 'name'), productData.name + global.dateTime));
      test('should click on "Search" button', () => client.waitForAndClick(Catalog.submit_filter_button));
      test('should click on the "Name" of the resulted product', () => client.waitForAndClick(Catalog.searched_product_link));
      test('should go to "Combinations" tab', () => client.waitForAndClick(AddProduct.quantity_combination_tab));
      test('should check that the first combination quantity is equal to "' + productData.combinationsQuantities.firstQuantity + '"', () => client.checkAttributeValue(AddProduct.Combination.attribute_quantity_input.replace("%NUMBER", 1), 'value', productData.combinationsQuantities.firstQuantity, 4000));
      test('should check that the second combination quantity is equal to "' + productData.combinationsQuantities.secondQuantity + '"', () => client.checkAttributeValue(AddProduct.Combination.attribute_quantity_input.replace("%NUMBER", 2), 'value', productData.combinationsQuantities.secondQuantity, 4000));
    }, 'common_client');
    multistore.enableAndDisableShareAvailableQuantites(true);
    multistore.deleteShopWithSearch(shopData);
    preferences.enableOrDisableMultistore(true);
  }, 'common_client');
}, 'common_client', true);

scenario('Re-install the shop after changing quantities of all products to zero', () => {
  scenario('Open the browser then access to install page', client => {
    test('should open the browser', async () => {
      await client.open();
      await client.startTracing('9145');
    });
    test('should go to the install page', async () => {
      await client.openShopURL(global.installFolderName);
      await client.waitFor(5000);
    });
  }, 'common_client');
  install.installShop(global.language, ['en'], true);
}, 'common_client');


