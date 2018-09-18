const {Menu} = require('../../../selectors/BO/menu');
const {CommonBO} = require('../../../selectors/BO/commonBO');
const {HomePage} = require('../../../selectors/FO/homePage');
const {ProductPageFO} = require('../../../selectors/FO/productPage');
const {AddProduct} = require('../../../selectors/BO/catalog/products/addProduct');
const {Catalog} = require('../../../selectors/BO/catalog/products/catalog');

module.exports = {
  /**
   * @param productData
   * let productData = {
   *  name: 'product name' (required),
   *  reference: 'product reference' (required),
   *  quantity: 'product quantity' (required),
   *  type: 'product type (standard, pack, virtual, combination)' (required),
   *  priceHT: 'product price HT' (required),
   *  pictures: [
   *   'first product picture', (required)
   *   'second product picture' (required)
   *  ]
   *  options: {
   *   customization: 'customizationValue' (optional)
   *  },
   *  quantities: {
   *   availability: 'Availability preferences (default, allow orders, deny orders)' (optional)
   *  }
   *
   * };
   */
  async createProduct(productData) {
    scenario('Create a new product in the Back Office', client => {
      test('should go to "Catalog" page', async() => {
        await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
        await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 1000);
      });
      test('should click on "New product" button', () => client.waitForAndClick(Catalog.add_new_button, 2000));
      test('should set the "Name" input', () => client.waitForAndType(AddProduct.Basic_settings.name_input, productData.name + global.dateTime));
      test('should set the "Reference" input', () => client.waitForAndType(AddProduct.Basic_settings.reference_input, productData.reference));
      test('should set the "Quantity" input', () => client.waitForAndType(AddProduct.Basic_settings.quantity_input, productData.quantity, 2000));
      test('should set the "Price" input', () => client.clearInputAndSetValue(AddProduct.Basic_settings.price_input, productData.priceHT));
      for (let i = 0; i < productData.pictures.length; i++) {
        test('should upload the ' + client.stringifyNumber(i+1) + ' product picture', () => client.uploadFile(AddProduct.Basic_settings.files_input, dataFileFolder, productData.pictures[i]));
      }
      test('should close the symfony toolbar', async () => {
        await page.waitFor(2000);
        await client.isVisible(CommonBO.symfony_toolbar_close_button, 2000);
        if (global.visible) {
          await client.waitForAndClick(CommonBO.symfony_toolbar_close_button);
        }
      });
      test('should click on "Online"', () => client.waitForAndClick(AddProduct.online_switcher));

      if (productData.type === 'standard') {
        test('should click on "Simple product" radio button', () => client.waitForAndClick(AddProduct.Basic_settings.simple_product_radio_button, 2000));
      }

      if (productData.type === 'combination') {
        scenario('Edit the combinations form', client => {
          test('should select the "Product with combination" radio button', () => client.waitForAndClick(AddProduct.Basic_settings.combination_radio_button));
          test('should go to "Combinations" tab', () => client.waitForAndClick(AddProduct.quantity_combination_tab));
          test('should choose the combinations', async () => {
            await client.waitForAndClick(AddProduct.Combination.attribute_size_checkbox_button.replace('%ID', 1), 1000); // combination size s
            await client.waitForAndClick(AddProduct.Combination.attribute_size_checkbox_button.replace('%ID', 2), 1000); // combination size m
          });
          test('should click on "Generate" button', () => client.waitForAndClick(AddProduct.Combination.generate_combination_button, 3000));
          test('should verify the appearance of the green validation', async() => {
            await client.checkTextValue(AddProduct.validation_msg, 'Settings updated.');
            await client.waitForAndClick(AddProduct.close_validation_button);
          });
          test('should check the appearance of combinations', () => client.waitFor(AddProduct.Combination.combination_tr.replace('%POS', 1), {visible: true, timeout: 10000}));
          if (productData.hasOwnProperty('combinationsQuantities')) {
            scenario('Add quantities to combinations', client => {
              test('should add quantities to combinations', async() => {
                await client.clearInputAndSetValue(AddProduct.Combination.attribute_quantity_input.replace("%NUMBER", 1), productData.combinationsQuantities.firstQuantity, 4000);
                await client.clearInputAndSetValue(AddProduct.Combination.attribute_quantity_input.replace("%NUMBER", 2), productData.combinationsQuantities.secondQuantity, 2000);
              });
            }, 'common_client');
          }
        }, 'common_client');
      }

      if (productData.hasOwnProperty('options')) {
        scenario('Edit the options form', client => {
          test('should click on "Options" tab', () => client.waitForAndClick(AddProduct.options_tab, 2000));
          if (productData.options.hasOwnProperty('customization')) {
            test('should add the "Customization field" of catalog', async () => {
              await client.waitForAndClick(AddProduct.Options.add_customization_button, 2000);
              await client.waitForAndType(AddProduct.Options.customization_input, productData.options.customization, 2000);
            });
          }
        }, 'catalog/product');
      }

      if (productData.hasOwnProperty('quantities')) {
        scenario('Edit the quantity form', client => {
          test('should click on "Quantity" tab"', () => client.waitForAndClick(AddProduct.quantity_combination_tab));
          if (productData.quantities.hasOwnProperty('availability') && productData.quantities.availability === 'default') {
            test('should check "Default behaviour" radio button', () => client.waitForAndClick(AddProduct.Quantity.default_behaviour_radio_button));
          }
        }, 'catalog/product');
      }

      scenario('Save the product then close the green validation', client => {
        test('should click on "Save" button', () => client.waitForAndClick(AddProduct.save_button));
        test('should check and close the green validation', async() => {
          await client.checkTextValue(AddProduct.validation_msg, 'Settings updated.');
          await client.waitForAndClick(AddProduct.close_validation_button);
        });
      }, 'common_client');
    }, 'common_client');
  },
  async searchProductInFo(productData) {
    scenario('Go to the front office and search for the created product', client => {
      test('should go to the Front Office', () => client.accessToFO(CommonBO.shopname_link, 1, 6000));
      test('should go switch language to "English"', () => client.switchShopLanguageInFo('en'));
      test('should search for the created product', async() => {
        await client.waitForAndClick(HomePage.search_input, 2000);
        await client.waitForAndType(HomePage.search_input, productData.name + global.dateTime, 2000);
        await client.waitForAndClick(HomePage.search_button, 2000);
      });
      test('should go to the product page"', () => client.waitForAndClick(HomePage.product_result_name, 2000));
    }, 'common_client');
  },
  async checkCustomizationInFO(productData, message) {
    scenario('Add and check the customization field in the Front Office', client => {
      test('should check the existing of the customization value', () => client.checkTextValue(ProductPageFO.customization_value, productData.options.customization));
      test('should set the "Customization message" input ', () => client.waitForAndType(ProductPageFO.message_customization_input, message, 2000));
      test('should click on "Save customization" button', () => client.waitForAndClick(ProductPageFO.save_customization_button, 2000));
      test('should check that the customization message is equal to "Your customization: ' + message + '"', () => client.checkTextValue(ProductPageFO.customization_creation, 'Your customization: ' + message, 'equal', 2000));
      test('should click on "Add to cart" button', () => client.waitForAndClick(ProductPageFO.add_to_cart_button, 2000));
      test('should click on "Proceed to checkout" button', () => client.waitForAndClick(ProductPageFO.proceed_to_checkout_modal_button, 2000));
      test('should click on "Product customization" link', () => client.waitForAndClick(ProductPageFO.product_customization_link, 2000));
      test('should check that the customization value in the pop-up is equal to "' + productData.options.customization + '"', () => client.checkTextValue(ProductPageFO.customizationvalue, productData.options.customization, 'equal', 2000));
      test('should check that the customization message pop-up is equal to "' + message + '"', async() => {
        await client.checkTextValue(ProductPageFO.customization_message, message, 'equal', 2000);
        await client.switchWindow(0);
      });
    }, 'common_client');
  }
};
