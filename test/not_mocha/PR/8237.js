const puppeteer = require('puppeteer');
require('../../globals');

const open = async () => {
  global.browser = await puppeteer.launch({headless: false, args: [`--window-size=${1280},${1024}`]});
};

const accessToBo = async () => {
  const pages = await browser.pages();
  global.page = await pages[0];
  await page.tracing.start({
    path: 'trace/8237.json',
    categories: ['devtools.timeline']
  });
  await page.goto(global.URL + global.adminFolderName);
  await page._client.send('Emulation.clearDeviceMetricsOverride');
  await page.waitFor('body').then(() => console.log('should check that the authentication page is well opened'));
};

const signInBo = async () => {
  await page.waitFor('#email');
  await page.type('#email', global.email);
  await page.waitFor('#passwd');
  await page.type('#passwd', global.password);
  await page.click('#submit_login').then(() => console.log('should login successfully in the Back Office'));
  await page.waitFor('body').then(() => console.log('should check that the dashboard page is well opened'));
};

const enableOrDisableMultistore = async (isEnabled = false) => {
  await page.waitFor('#subtab-ShopParameters');
  await page.click('#subtab-ShopParameters');
  await page.waitFor(1000);
  await page.waitFor('#subtab-AdminParentPreferences');
  await page.click('#subtab-AdminParentPreferences').then(() => console.log('should go to "Preferences" page'));
  await page.waitFor('span.ps-switch > label:nth-child(2)[for*="multishop"]');
  if (isEnabled) {
    await page.click('span.ps-switch > label:nth-child(2)[for*="multishop"]').then(() => console.log('should click on "No" button to disable multistore'));
  } else {
    await page.click('span.ps-switch > label:nth-child(4)[for*="multishop"]').then(() => console.log('should click on "Yes" button to enable multistore'));
  }
  await page.waitFor('div.card-footer button');
  await page.click('div.card-footer button').then(() => console.log('should click on "Save" button'));
  await page.waitFor(3000);
};

const createShop = async () => {
  // Create a new shop
  await page.waitFor(2000);
  const exist = await page.$('a[title="Close Toolbar"]', {visible: true});
  if (exist !== null) {
    await page.click('a[title="Close Toolbar"]');
  }
  await page.waitFor(2000);
  await page.waitFor('#subtab-AdminAdvancedParameters');
  await page.click('#subtab-AdminAdvancedParameters');
  await page.waitFor(1000);
  await page.waitFor('#subtab-AdminShopGroup');
  await page.click('#subtab-AdminShopGroup').then(() => console.log('should go to "Multistore" page'));
  await page.waitFor('#page-header-desc-shop_group-new_2 > i');
  await page.click('#page-header-desc-shop_group-new_2 > i').then(() => console.log('should click on "Add a new shop" button'));
  await page.waitFor('#name');
  await page.type('#name', 'secondShop').then(() => console.log('should set the "Name" input'));
  await page.waitFor('#shop_form_submit_btn');
  await page.click('#shop_form_submit_btn').then(() => console.log('should click on "Save" button'));

  // Search the created shop
  await page.waitFor('input[name="shopFilter_a!name"]');
  await page.type('input[name="shopFilter_a!name"]', 'secondShop');
  await page.waitFor(1000);
  await page.waitFor('#submitFilterButtonshop');
  await page.click('#submitFilterButtonshop').then(() => console.log('should search for the created shop'));

  // Set the URL of the created shop
  await page.waitFor('a.multishop_warning');
  await page.click('a.multishop_warning').then(() => console.log('should click on "Click here to set a URL for this shop." link'));
  await page.waitFor(1000);
  await page.waitFor('#virtual_uri');
  await page.type('#virtual_uri', 'secondShop').then(() => console.log('should set the "Virtual URL" input'));
  await page.waitFor('#shop_url_form_submit_btn_1');
  await page.click('#shop_url_form_submit_btn_1').then(() => console.log('should click on "Save" button'));
};

const deleteShop = async () => {
  // Create a new shop
  await page.waitFor(2000);
  await page.waitFor('#tab-AdminDashboard');
  await page.click('#tab-AdminDashboard').then(() => console.log('should go to "Dashboard" page'));

  await page.waitFor(3000);
  await page.waitFor('#subtab-AdminAdvancedParameters');
  await page.click('#subtab-AdminAdvancedParameters');
  await page.waitFor(1000);
  await page.evaluate(() => {
    document.querySelector('#subtab-AdminShopGroup').scrollIntoView();
  });
  await page.click('#subtab-AdminShopGroup').then(() => console.log('should go to "Multistore" page'));

  // Search the created shop
  await page.waitFor('#shops-tree li:nth-child(2) a');
  await page.click('#shops-tree li:nth-child(2) a');
  await page.waitFor(2000);
  await page.waitFor('#table-shop button[name="submitResetshop"]');
  await page.click('#table-shop button[name="submitResetshop"]');
  await page.waitFor(2000);
  await page.waitFor('input[name="shopFilter_a!name"]');
  await page.type('input[name="shopFilter_a!name"]', 'secondShop');
  await page.waitFor(1000);
  await page.waitFor('#table-shop button.dropdown-toggle');
  await page.click('#table-shop button.dropdown-toggle').then(() => console.log('should click on "Dropdown" button'));
  await page.on("dialog", (dialog) => {
    dialog.accept();
  });
  await page.waitFor(1000);
  await page.waitFor('#table-shop a.delete');
  await page.click('#table-shop a.delete').then(() => console.log('should click on "Delete" button'));
};

const switchShop = async (isSelected = 'All shop') => {
  await page.waitFor('#tab-AdminDashboard');
  await page.click('#tab-AdminDashboard').then(() => console.log('should go to "Dashboard" page'));
  await page.waitFor(1000);
  await page.waitFor('#header_shop');
  await page.click('#header_shop').then(() => console.log('should click on "Shop name" button'));
  await page.waitFor(1000);
  let index = 1;
  if (isSelected !== 'All shop') {
    index = await isSelected === 'First shop' ? 3 : 4;
  }
  await page.waitFor(2000);
  await page.waitFor('#header_shop li:nth-child(' + index + ') > a:nth-child(1)');
  await page.click('#header_shop li:nth-child(' + index + ') > a:nth-child(1)').then(() => console.log('should choose the "' + isSelected + '" from the dropdown list'));
  await page.waitFor(3000);
};

const disableOrEnableInstalledModule = async (dataTechName, enable = false) => {
  await page.waitFor('#subtab-AdminParentModulesSf');
  await page.click('#subtab-AdminParentModulesSf');
  await page.waitFor(3000);
  await page.waitFor('#subtab-AdminModulesSf');
  await page.click('#subtab-AdminModulesSf').then(() => console.log('should go to "Manage installed modules" page'));
  await page.waitFor(1000);
  await page.waitFor('input.pstaggerAddTagInput');
  await page.type('input.pstaggerAddTagInput', dataTechName);
  await page.waitFor(3000);
  await page.waitFor('#module-search-button');
  await page.click('#module-search-button').then(() => console.log('should search for the module "' + dataTechName + '" by datatechname'));
  if (enable) {
    await page.waitFor(3000);
    await page.waitFor('button[data-confirm_modal="module-modal-confirm-' + dataTechName + '-enable"]');
    await page.click('button[data-confirm_modal="module-modal-confirm-' + dataTechName + '-enable"]');
  } else {
    await page.waitFor(3000);
    await page.waitFor('div[data-tech-name="' + dataTechName + '"] div[class="module-actions"] button.btn');
    await page.click('div[data-tech-name="' + dataTechName + '"] div[class="module-actions"] button.btn');
    await page.waitFor(1000);
    await page.waitFor('button[data-confirm_modal="module-modal-confirm-' + dataTechName + '-disable"]');
    await page.click('button[data-confirm_modal="module-modal-confirm-' + dataTechName + '-disable"]').then(() => console.log('should click on "Disable" action from the dropdown list'));
    await page.waitFor(2000);
    await page.waitForSelector('div.modal-footer > a.module_action_modal_disable[data-tech-name="' + dataTechName + '"]', {visible: true});
    await page.click('div.modal-footer > a.module_action_modal_disable[data-tech-name="' + dataTechName + '"]').then(() => console.log('should click on "Yes, disable it" button'));
  }
  await page.waitFor(5000);
};

const checkInstalledModule = async (dataTechName) => {
  await page.waitFor('#subtab-AdminParentModulesSf');
  await page.click('#subtab-AdminParentModulesSf');
  await page.waitFor(3000);
  await page.waitFor('#subtab-AdminModulesSf');
  await page.click('#subtab-AdminModulesSf').then(() => console.log('should go to "Manage installed modules" page'));
  await page.waitFor(1000);
  await page.waitFor('input.pstaggerAddTagInput');
  await page.type('input.pstaggerAddTagInput', dataTechName);
  await page.waitFor(3000);
  await page.waitFor('#module-search-button');
  await page.click('#module-search-button').then(() => console.log('should search for the module "' + dataTechName + '" by data-tech-name'));
  await page.waitFor(2000);
  await page.waitForSelector('div[data-tech-name="' + dataTechName + '"] a[href *="configure"]').then(() => console.log('should check that the "' + dataTechName + '" module is well enabled'));
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/8237
 */
open()
  .then(() => console.log('should open the browser'))
  .then(async () => {
    await accessToBo().then(async () => {
      await signInBo();
      await enableOrDisableMultistore();
      await createShop();
      await switchShop('First shop');
      await disableOrEnableInstalledModule('contactform');
      await switchShop('Second shop');
      await checkInstalledModule('contactform');
      await switchShop('First shop');
      await disableOrEnableInstalledModule('contactform', true);
      await deleteShop();
      await enableOrDisableMultistore(true);
    });
    await page.tracing.stop();
    await browser.close();
  });

