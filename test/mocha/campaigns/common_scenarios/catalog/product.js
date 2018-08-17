const {Menu} = require('../../../selectors/BO/menu');
const {CommonBO} = require('../../../selectors/BO/commonBO');
const {ProductPage} = require('../../../selectors/BO/catalog/productsPage');
const {HomePage} = require('../../../selectors/FO/homePage');
const {ProductPageFO} = require('../../../selectors/FO/productPage');

module.exports = {
  async createProduct(productData) {
    scenario('Create a new product in the Back Office', client => {
      test('should go to "Catalog" page', async () => {
        await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu, 2000);
        await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 2000);
      });
      test('should click on "New product" button', () => client.waitForAndClick(ProductPage.new_product_button, 2000));
      test('should set the "Name" input', () => client.waitForAndType(ProductPage.product_name_input, productData.name + global.dateTime, 2000));
      test('should set the "Quantity" input', () => client.waitForAndType(ProductPage.quantity_input, productData.quantity, 2000));
      test('should set the "Reference" input', () => client.waitForAndType(ProductPage.product_reference, productData.reference, 2000));
      test('should click on "Simple product" radio button', () => client.waitForAndClick(ProductPage.simple_product_button_radio, 2000));
      test('should click on "Options" tab', () => client.waitForAndClick(ProductPage.options_tab, 2000));
      test('should add the "Customization field" of catalog', async () => {
        await client.waitForAndClick(ProductPage.add_customization_button, 2000);
        await client.waitForAndType(ProductPage.customization_input, productData.customization, 2000);
      });
      test('should close the symfony toolbar', async () => {
        await page.waitFor(2000);
        const exist = await page.$(ProductPage.symfony_toolbar, {visible: true});
        if (exist !== null) {
          await page.click(ProductPage.symfony_toolbar);
        }
      });
      test('should switch the product "online"', () => client.waitForAndClick(ProductPage.product_online_toggle, 2000));
      test('should check and close the green validation', () => client.waitForAndClick(ProductPage.close_validation_button));
    }, 'common_client');
  },
  async searchProductInFo(productData) {
    scenario('Go to the front office and search for the created product', client => {
      test('should go to the Front Office', () => client.accessToFO(CommonBO.shopname_link, 1));
      test('should search for the created product', async () => {
        await client.waitForAndClick(HomePage.search_input, 2000);
        await client.waitForAndType(HomePage.search_input, productData.name + global.dateTime, 2000);
        await client.waitForAndClick(HomePage.search_button, 2000);
      });
      test('should go to the product page"', () => client.waitForAndClick(HomePage.product_result_name, 2000));
    }, 'common_client');
  },
  async checkCustomizationInFO(productData, message) {
    scenario('Add and check the customization field in the Front Office', client => {
      test('should check the existing of the customization value', () => client.checkTextValue(ProductPageFO.customization_value, productData.customization));
      test('should set the "Customization message" input ', () => client.waitForAndType(ProductPageFO.message_customization_input, message, 2000));
      test('should click on "Save customization" button', () => client.waitForAndClick(ProductPageFO.save_customization_button, 2000));
      test('should check that the customization message is equal to "Your customization: ' + message + '"', () => client.checkTextValue(ProductPageFO.customization_creation, 'Your customization: ' + message, 'equal', 2000));
      test('should click on "Add to cart" button', () => client.waitForAndClick(ProductPageFO.add_to_cart_button, 2000));
      test('should click on "Proceed to checkout" button', () => client.waitForAndClick(ProductPageFO.proceed_to_checkout_button, 2000));
      test('should click on "Product customization" link', () => client.waitForAndClick(ProductPageFO.product_customization_link, 2000));
      test('should check that the customization value in the pop-up is equal to "' + productData.customization + '"', () => client.checkTextValue(ProductPageFO.customizationvalue, productData.customization, 'equal', 2000));
      test('should check that the customization message pop-up is equal to "' + message + '"', async () => {
        await client.checkTextValue(ProductPageFO.customization_message, message, 'equal', 2000);
        await client.switchWindow(0);
      });
    }, 'common_client');
  }
};
