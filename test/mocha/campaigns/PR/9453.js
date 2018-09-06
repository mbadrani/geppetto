const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');
const {Categories} = require('../../selectors/BO/catalog/categories/categories');
const {Customers} = require('../../selectors/BO/customers/customers/customers');
const {Addresses} = require('../../selectors/BO/customers/addresses/addresses');
const {Brands} = require('../../selectors/BO/catalog/brandsAndSuppliers/brands/brands');
const {Suppliers} = require('../../selectors/BO/catalog/brandsAndSuppliers/suppliers/suppliers');
const {ImportPage} = require('../../selectors/BO/advancedParameters/importPage');
const {Search} = require('../../selectors/BO/shopParameters/search');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9453
 */
scenario('PR-9453: Check the pre-selected entity in the import page', () => {
  authentication.signInBO('9453');
  scenario('Check the preselected entity for the products', client=> {
    test('should go to "Products" page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu, 2000);
      await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 2000);
    });
    test('should click on "Import" button', async () => {
      await client.waitForAndClick(Catalog.tools_button);
      await client.waitForAndClick(Catalog.import_button);
    });
    test('should check that the "Import" page is well opened', () => client.waitFor(ImportPage.entity_select));
    test('should check that the "Products" entity is well selected', () => client.checkSelectedValue(ImportPage.entity_select, 'Products'));
  }, 'common_client');
  scenario('Check the preselected entity for the categories', client=> {
    test('should go to "Categories" page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu, 2000);
      await client.waitForAndClick(Menu.Sell.Catalog.category_submenu, 2000);
    });
    test('should click on "Import" button', () => client.waitForAndClick(Categories.import_button));
    test('should check that the "Import" page is well opened', () => client.waitFor(ImportPage.entity_select));
    test('should check that the "Categories" entity is well selected', () => client.checkSelectedValue(ImportPage.entity_select, 'Categories'));
  }, 'common_client');
  scenario('Check the preselected entity for the customers', client=> {
    test('should go to "Customers" page', async () => {
      await client.waitForAndClick(Menu.Sell.Customers.customers_menu, 2000);
      await client.waitForAndClick(Menu.Sell.Customers.customers_submenu, 2000);
    });
    test('should click on "Import" button', () => client.waitForAndClick(Customers.import_button));
    test('should check that the "Import" page is well opened', () => client.waitFor(ImportPage.entity_select));
    test('should check that the "Customers" entity is well selected', () => client.checkSelectedValue(ImportPage.entity_select, 'Customers'));
  }, 'common_client');
  scenario('Check the preselected entity for the addresses', client=> {
    test('should go to "Addresses" page', async () => {
      await client.waitForAndClick(Menu.Sell.Customers.customers_menu, 2000);
      await client.waitForAndClick(Menu.Sell.Customers.addresses_submenu, 2000);
    });
    test('should click on "Import" button', () => client.waitForAndClick(Addresses.import_button));
    test('should check that the "Import" page is well opened', () => client.waitFor(ImportPage.entity_select));
    test('should check that the "Addresses" entity is well selected', () => client.checkSelectedValue(ImportPage.entity_select, 'Addresses'));
  }, 'common_client');
  scenario('Check the preselected entity for the brands', client=> {
    test('should go to "Brands" page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu, 2000);
      await client.waitForAndClick(Menu.Sell.Catalog.manufacturers_submenu, 2000);
    });
    test('should click on "Import" button', () => client.waitForAndClick(Brands.import_button));
    test('should check that the "Import" page is well opened', () => client.waitFor(ImportPage.entity_select));
    test('should check that the "Brands" entity is well selected', () => client.checkSelectedValue(ImportPage.entity_select, 'Brands'));
  }, 'common_client');
  scenario('Check the preselected entity for the suppliers', client=> {
    test('should go to "Suppliers" page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu, 2000);
      await client.waitForAndClick(Menu.Sell.Catalog.manufacturers_submenu, 2000);
    });
    test('should click on "Suppliers" tab', () => client.waitForAndClick(Menu.Sell.Catalog.supplier_tab, 2000));
    test('should click on "Import" button', () => client.waitForAndClick(Suppliers.import_button));
    test('should check that the "Import" page is well opened', () => client.waitFor(ImportPage.entity_select));
    test('should check that the "Suppliers" entity is well selected', () => client.checkSelectedValue(ImportPage.entity_select, 'Suppliers'));
  }, 'common_client');
  scenario('Check the preselected entity for the alias', client=> {
    test('should go to "Search" page', async () => {
      await client.waitForAndClick(Menu.Configure.ShopParameters.shop_parameters_menu, 2000);
      await client.scrollIntoView(Menu.Configure.ShopParameters.search_submenu);
      await client.waitForAndClick(Menu.Configure.ShopParameters.search_submenu, 2000);
    });
    test('should click on "Import" button', () => client.waitForAndClick(Search.import_button));
    test('should check that the "Import" page is well opened', () => client.waitFor(ImportPage.entity_select));
    test('should check that the "Alias" entity is well selected', () => client.checkSelectedValue(ImportPage.entity_select, 'Alias'));
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);