const puppeteer = require('puppeteer');
require('../globals');
const chai = require('chai');
chai.use(require('chai-string'));
const expect = chai.expect;
let fs = require('fs');
const exec = require('child_process').exec;
global.prestashopFile = '';
global.folderExist;

const installShop = async (debugMode = false) => {
  const browser = await puppeteer.launch({ headless: false, args: [`--window-size=${1500},${2000}`] });
  const pages = await browser.pages();
  const page = await pages[0];
  await page.tracing.start({
    path: 'trace/installshop.json',
    categories: ['devtools.timeline']
  });

  await page._client.send('Emulation.clearDeviceMetricsOverride');
  fs.existsSync(rcTarget + prestashopFolderName) ? global.folderExist = true : global.folderExist = false;
  if (global.folderExist) {
    console.error('The prestashop folder exist in your path: "' + rcTarget + '"')
  } else {
    if (global.rcTarget !== '' && global.rcLink !== '') {
      await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: global.downloadFileFolder});
      await page.evaluate(async rcLink => {
        return document.location.href = rcLink;
      }, rcLink);
      await page.waitFor(160000);

      await exec('grep -l "prestashop*.zip" ' + global.downloadFileFolder + '* | sed -r "s/.+\\/(.+)\\..+/\\1/"',
        (error, stdout, stderr) => {
          if (error !== null) {
            console.log(`[exec] Error while getting the ZIP file name: ${error}`);
          } else {
            console.log('should successfully download the ZIP file');
            prestashopFile = stdout.replace('\n', "");
          }
        });
      await page.waitFor(2000);
      await exec('cp ' + global.downloadFileFolder + prestashopFile + '.zip ' + rcTarget,
        (error, stdout, stderr) => {
          if (error !== null) {
            console.log(`[exec] Error while copying the ZIP file: ${error}`);
          } else {
            console.log('should successfully copy the ZIP file in the RC_TARGET');
          }
        });
      await page.waitFor(5000);
      await exec('rm -f ' + global.downloadFileFolder + prestashopFile + '.zip ',
        (error, stdout, stderr) => {
          if (error !== null) {
            console.log(`[exec] Error while removing the downloaded ZIP file: ${error}`);
          } else {
            console.log('should successfully remove the downloaded ZIP file');
          }
        });
      await page.waitFor(5000);
      await exec('unzip ' + rcTarget + prestashopFile + '.zip -d ' + rcTarget + prestashopFolderName,
        (error, stdout, stderr) => {
          if (error !== null) {
            console.log(`[exec] Error while extracting the ZIP file: ${error}`);
          } else {
            console.log('should successfully extract the ZIP file in prestashop folder');
          }
        });
      await page.waitFor(10000);
      await exec('chmod 777 -R ' + rcTarget + prestashopFolderName,
        (error, stdout, stderr) => {
          if (error !== null) {
            console.log(`[exec] Error while applying the CHMOD: ${error}`);
          } else {
            console.log('should successfully apply all the permissions');
          }
        });
      await page.waitFor(10000);

      await page._client.send('Emulation.clearDeviceMetricsOverride');
      await page.goto(global.URL);
      await page.waitFor(12000);
      await exec('mv ' + rcTarget + prestashopFolderName + '/admin' + ' ' + rcTarget + prestashopFolderName + '/admin-dev',
        (error, stdout, stderr) => {
          if (error !== null) {
            console.log(`[exec] Error while renaming the admin folder: ${error}`);
          } else {
            console.log('should successfully rename the admin folder');
          }
        });
      await page.waitFor(10000);
      await exec('mv ' + rcTarget + prestashopFolderName + '/install' + ' ' + rcTarget + prestashopFolderName + '/install-dev',
        (error, stdout, stderr) => {
          if (error !== null) {
            console.log(`[exec] Error while renaming the install folder: ${error}`);
          } else {
            console.log('should successfully rename the install folder');
          }
        });
    }
    if (debugMode) {
      const definesFile = rcTarget + global.prestashopFolderName + '/config/defines.inc.php';
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

    await page.goto(global.URL + global.installFolderName);

    await page.waitFor('body');

    console.log('Step 1 : Choose your language');
    // use page.select
    await page.waitFor(2000);
    await page.waitFor('#langList');
    await page.select('#langList', global.language);
    await page.waitFor(5000);
    await page.waitFor('#btNext');
    await page.click('#btNext');

    console.log('Step 2 : License agreements');
    // Accept the terms and conditions
    await page.waitFor('#set_license');
    await page.click('#set_license');
    await page.click('#btNext');

    console.log('Step 3 : System compatibility');
    // Checking prestashop compatibility
    await page.waitFor(5000);
    await page.$eval('#sheet_system > h3, #sheet_ > h3', (el, attribute) => el.getAttribute(attribute), 'class').then((className) => {
      expect(className, 'Failed: Verify your system compatibility!').to.be.equal('okBlock');
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
    await page.$eval('#dbResultCheck', (el, attribute) => el.getAttribute(attribute), 'class').then((className) => {
      expect(className, 'Failed: Verify your database configuration!').to.be.equal('okBlock');
    });
    await page.waitFor(3000);
    await page.click('#btNext');
    console.log('Step 6 : Store installation');
    console.log('\t The installation is started');
    // Waiting for installation
    await page.waitForSelector('li[id=process_step_generateSettingsFile][class*="success"]', {timeout: 360000}).then(() => console.log('\t Create file parameters'));
    await page.waitForSelector('li[id=process_step_installDatabase][class*="success"]', {timeout: 360000}).then(() => console.log('\t Create database tables'));
    await page.waitForSelector('li[id=process_step_installDefaultData][class*="success"]', {timeout: 360000}).then(() => console.log('\t Create default shop and languages'));
    await page.waitForSelector('li[id=process_step_populateDatabase][class*="success"]', {timeout: 360000}).then(() => console.log('\t Populate database tables'));
    await page.waitForSelector('li[id=process_step_configureShop][class*="success"]', {timeout: 360000}).then(() => console.log('\t Configure shop information'));
    await page.waitForSelector('li[id=process_step_installFixtures][class*="success"]', {timeout: 360000}).then(() => console.log('\t Install demonstration data'));
    await page.waitForSelector('li[id=process_step_installModules][class*="success"]', {timeout: 360000}).then(() => console.log('\t Install modules'));
    await page.waitForSelector('li[id=process_step_installModulesAddons][class*="success"]', {timeout: 360000}).then(() => console.log('\t Install Addons modules'));
    await page.waitForSelector('li[id=process_step_installTheme][class*="success"]', {timeout: 360000}).then(() => console.log('\t Install theme'));
    await page.waitForSelector('#install_process_success > div.clearfix > h2').then(() => console.log('Finish installation'));

    //Checking that the installation of shop is well finished
    const exists = await page.$('#install_process_success > div.clearfix > h2') !== null;
    expect(exists).to.be.true;
  }
  await page.tracing.stop();
  await browser.close();
};

installShop();