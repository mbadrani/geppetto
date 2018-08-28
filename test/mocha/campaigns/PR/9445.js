const {Menu} = require('../../selectors/BO/menu');
const {AddProduct} = require('../../selectors/BO/Catalog/Products/addProduct');
const {Catalog} = require('../../selectors/BO/Catalog/Products/catalog');
const {HomePage} = require('../../selectors/FO/homePage');
const {SearchProduct} = require('../../selectors/FO/SearchPage');
const {Product} = require('../../selectors/FO/ProductPage');

let productData = {
  name: 'P1',
  reference: 'P8710',
  quantity: '12',
  priceHT: '20'
};

scenario('This scenario is based on the bug described on his PR: https://github.com/PrestaShop/PrestaShop/pull/9445', client => {
   scenario('Open the browser and login in the BackOffice', client => {
    test('should open the browser and start tracing', async () => {
      await client.open();
      await client.startTracing('9445');
    });
    test('should go to the Back office', () => client.accessToBO());
    test('should login successfully in the Back office', () => client.signInBO());
  }, 'common_client');

   scenario('Create a new product', client => {
    test('should go to product page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
      await client.waitFor(1000);
      await client.waitForAndClick(Menu.Sell.Catalog.products_submenu);
    });
     test('should click on "New product"', () => client.waitForAndClick(Catalog.add_new_button));
     test('should set the "Name" input', () => client.waitForAndType(AddProduct.Basic_settings.name_input, productData.name + global.dateTime));
     test('should set the "Reference" input', () => client.waitForAndType(AddProduct.Basic_settings.reference_input, productData.reference));
     test('should set the "Quantity" input', () => client.clearInputAndSetValue(AddProduct.Basic_settings.quantity_input, productData.quantity));
     test('should set the "Price" input', () => client.clearInputAndSetValue(AddProduct.Basic_settings.price_input, productData.priceHT));
     test('should click on "Quantity" tab"', () => client.waitForAndClick(AddProduct.quantity_combination_tab));
     test('should check "Default behaviour" radio button', () => client.waitForAndClick(AddProduct.Quantity.default_behaviour_radio_button));
     test('should close the symfony toolbar', async () => {
       await page.waitFor(2000);
       const exist = await page.$(AddProduct.symfony_toolbar, {visible: true});
       if (exist !== null) {
         await page.click(AddProduct.symfony_toolbar);
       }
     });
     test('should click on "Online"', () => client.waitForAndClick(AddProduct.online_switcher));
     test('should click on "Save" button', () => client.waitForAndClick(AddProduct.save_button));
  }, 'common_client');

  scenario('Check order in the Front Office', client => {
    test('should go to the Front office', () => client.openShopURL());
    test('should search for the created product', async () => {
      await client.waitForAndType(HomePage.search_input, productData.name + global.dateTime);
      await client.keyboardPress('Enter');
    });
    test('should go to the searched product page', () => client.waitForAndClick(SearchProduct.product_result_name));
    test('should set the quantity wanted input to ' + productData.quantity, () => client.eval(Product.quantity_wanted_input, productData.quantity, 1000));
    test('should check that the "Add to cart" button is still enabled', () => client.isEnable(Product.add_to_cart_button));
    test('should check that the product availability message is empty', () => client.checkTextValue(Product.product_availability, ''));
  }, 'common_client');
}, 'common_client', true);
