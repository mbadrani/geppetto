const puppeteer = require('puppeteer');
const globals = require('../globals');
const chai = require('chai');
chai.use(require('chai-string'));
const expect = chai.expect;
let fs = require('fs');

const installShop = async (debugMode = false) => {
  const browser = await puppeteer.launch({ headless: false, args: [`--window-size=${1500},${2000}`] });
  const page = await browser.newPage();
  await page.tracing.start({
    path: 'traceinstallshop.json',
    categories: ['devtools.timeline']
  });

  if (debugMode) {
    const definesFile = global.rcTarget + '/config/defines.inc.php';
    await fs.readFile(definesFile, 'utf8', (err, content) => {
      global.ps_mode_dev = (content.substring(content.indexOf("define('_PS_MODE_DEV_', "), content.indexOf(");")).split(', ')[1]) === 'true' ? true : false;
      if (!global.ps_mode_dev) {
        const result = content.replace("define('_PS_MODE_DEV_', false);", "define('_PS_MODE_DEV_', true);");
        console.log(result);
        fs.writeFile(definesFile, result, 'utf8', function (err) {
          if (err) return console.log(err);
          console.log("The Debug mode is activated!");
        });
      }
    });
  }

  await page.goto(global.URL + 'install-dev/');
  await page.setViewport({width: 1500, height: 2000});
  await page.waitFor('body');

  console.log('Step 1 : Choose your language');
  // use page.select
  await page.waitFor(2000);
  await page.waitFor('#langList');
  await page.select('#langList', global.language);
  await page.waitFor(2000);
  await page.waitFor('#btNext');
  await page.click('#btNext');

  console.log('Step 2 : License agreements');
  // Accept the terms and conditions
  await page.waitFor('#set_license');
  await page.click('#set_license');
  await page.click('#btNext');

  console.log('Step 3 : System compatibility');
  // Checking prestashop compatibility
  await page.waitFor(2000);
  await page.$eval('#sheet_system > h3', el => el.innerText).then((text) => {
    expect(text).to.be.equal('PrestaShop compatibility with your system environment has been verified!');
  });
  await page.click('#btNext');

  console.log('Step 4 : Store information');
  // Fill the information form
  await page.waitFor('#infosShop');
  await page.type('#infosShop', 'puppeteerDemo');

  await page.click('#infosCountry_chosen');
  await page.type('#infosCountry_chosen > div > div > input[type="text"]', global.country);
  await page.click('#infosCountry_chosen');

  await page.type('#infosFirstname', global.firstName);
  await page.type('#infosName', global.lastName);
  await page.type('#infosEmail', global.email);
  await page.type('#infosPassword', global.password);
  await page.type('#infosPasswordRepeat', global.password);
  await page.click('#btNext');

  console.log('Step 5 : System configuration');
  // Fill the database configuration form
  await page.waitFor(3000);
  await page.$eval('input#dbServer', (el, value) => el.value = value, global.dbServer);
  await page.$eval('input#dbName', (el, value) => el.value = value, 'database' + global.dateTime);
  await page.$eval('input#dbLogin', (el, value) => el.value = value, global.dbUser);
  if (global.dbPassword === 'undefined') {
    await page.$eval('input#dbPassword', (el, value) => el.value = value, '');
  } else {
    await page.$eval('input#dbPassword', (el, value) => el.value = value, global.dbPassword);
  }
  await page.click('#btTestDB');
  await page.waitFor(3000);
  await page.click('#btCreateDB');
  // Checking the database creation
  await page.waitFor(3000);
  await page.$eval('#dbResultCheck', el => el.innerText).then((text) => {
    console.log('\t ' + text);
    expect(text).to.be.equal('Database is created');
  });
  await page.waitFor(3000);
  await page.click('#btNext');
  console.log('Step 6 : Store installation');
  console.log('\t The installation is started');
  // Waiting for installation
  await page.waitForSelector('li[id=process_step_generateSettingsFile][class*="success"]', {timeout: 360000}).then(() => console.log('\t Create file parameter'));
  await page.waitForSelector('li[id=process_step_installDatabase][class*="success"]', {timeout: 360000}).then(() => console.log('\t Create database'));
  await page.waitForSelector('li[id=process_step_installDefaultData][class*="success"]', {timeout: 360000}).then(() => console.log('\t Create default shop'));
  await page.waitForSelector('li[id=process_step_populateDatabase][class*="success"]', {timeout: 360000}).then(() => console.log('\t Create database table'));
  await page.waitForSelector('li[id=process_step_configureShop][class*="success"]', {timeout: 360000}).then(() => console.log('\t Create shop information'));
  await page.waitForSelector('li[id=process_step_installFixtures][class*="success"]', {timeout: 360000}).then(() => console.log('\t Create demonstration data'));
  await page.waitForSelector('li[id=process_step_installModules][class*="success"]', {timeout: 360000}).then(() => console.log('\t Create install module'));
  await page.waitForSelector('li[id=process_step_installModulesAddons][class*="success"]', {timeout: 360000}).then(() => console.log('\t Create addons modules'));
  await page.waitForSelector('li[id=process_step_installTheme][class*="success"]', {timeout: 360000}).then(() => console.log('\t Create install theme'));
  await page.waitForSelector('#install_process_success > div.clearfix > h2').then(() => console.log('Finish installation'));

  //Checking that the installation of shop is well finished
  await page.$eval('#install_process_success > div.clearfix > h2', el => el.innerText).then((text) => {
    console.log('\t ' + text);
    expect(text).to.be.equal('Your installation is finished!');
  });
  await page.tracing.stop();
  await browser.close();
};

installShop();