const puppeteer = require('puppeteer');
let argv = require('minimist')(process.argv.slice(2));
const chai = require('chai');
chai.use(require('chai-string'));
const expect = chai.expect;

const downloadLatestVersion = async () => {
  const browser = await puppeteer.launch({headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.tracing.start({
    path: 'downloadversion.json',
    categories: ['devtools.timeline']
  });
  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: './test/datas/'});
  await page.goto('https://' + argv.UrlLastStableVersion);
  await page.waitFor('body');
  await page.click('#edit-submitted-termsconditions > div > label');
  await page.click('#webform-client-form-501 > div > div.form-actions > input', {waitUntil: 'networkidle2'});

  await page.waitFor(100000);
  await page.tracing.stop();
  await browser.close();
};

const InstallShop = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', `--window-size=${1500},${2000}`]
  });
  const page = await browser.newPage();
  await page.tracing.start({
    path: 'traceinstallshop.json',
    categories: ['devtools.timeline']
  });

  await page.goto('http://' + argv.URL + 'install/');
  await page.setViewport({width: 1500, height: 2000});
  await page.waitFor('body');

  console.log('Choose your language');
  // use page.select
  await page.waitFor('#langList');
  await page.select('#langList', argv.LANG);
  await page.waitFor(2000);
  await page.waitFor('#btNext');
  await page.click('#btNext');

  console.log('License agreements');
  // Accept the terms and conditions
  await page.waitFor('#set_license');
  await page.click('#set_license');
  await page.click('#btNext');

  console.log('System compatibility');
  // Checking prestashop compatibility
  await page.waitFor(2000);
  await page.evaluate(() => document.querySelector('#sheet_ > h3').textContent).then((text) => {
    expect(text).to.be.equal('PrestaShop compatibility with your system environment has been verified!');
  });
  await page.click('#btNext');

  console.log('Store information');
  // Fill the information form
  await page.waitFor('#infosShop');
  await page.type('#infosShop', 'puppeteerDemo');

  await page.click('#infosCountry_chosen');
  await page.type('#infosCountry_chosen > div > div > input[type="text"]', argv.COUNTRY);
  await page.click('#infosCountry_chosen');

  await page.type('#infosFirstname', 'Demo');
  await page.type('#infosName', 'Prestashop');
  await page.type('#infosEmail', 'demo@prestashop.com');
  await page.type('#infosPassword', 'prestashop_demo');
  await page.type('#infosPasswordRepeat', 'prestashop_demo');
  await page.click('#btNext');

  console.log('System configuration');
  // Fill the database configuration form
  await page.waitFor(3000);
  await page.evaluate(() => { document.querySelector('input#dbServer').value = '' });
  await page.type('#dbServer', argv.DB_SERVER);
  await page.evaluate(() => { document.querySelector('input#dbName').value = '' });
  await page.type('#dbName', 'database' + new Date().getTime());
  await page.evaluate(() => { document.querySelector('input#dbLogin').value = '' });
  await page.type('#dbLogin', argv.DB_USER);
  if (argv.DB_PASSWD === 'undefined') {
    await page.evaluate(() => { document.querySelector('input#dbPassword').value = '' });
  } else {
    await page.evaluate(() => { document.querySelector('input#dbPassword').value = '' });
    await page.type('#dbPassword', argv.DB_PASSWD);
  }
  await page.click('#btTestDB');
  await page.waitFor(3000);
  await page.click('#btCreateDB');
  // Checking the database creation
  await page.waitFor(3000);
  await page.evaluate(() => document.querySelector('#dbResultCheck').textContent).then((text) => {
    console.log(text);
    expect(text).to.be.equal('Database is created');
  });
  await page.waitFor(3000);
  await page.click('#btNext');
  console.log('Store installation');
  console.log('The installation is started');
  // Waiting for installation
  await page.waitForXPath('//li[@id="process_step_generateSettingsFile" and @class="process_step success"]', {timeout: 360000}).then(() => console.log('Create file parameter'));
  await page.waitForXPath('//li[@id="process_step_installDatabase" and @class="process_step success"]', {timeout: 360000}).then(() => console.log('Create database'));
  await page.waitForXPath('//li[@id="process_step_installDefaultData" and @class="process_step success"]', {timeout: 360000}).then(() => console.log('Create default shop'));
  await page.waitForXPath('//li[@id="process_step_populateDatabase" and @class="process_step success"]', {timeout: 360000}).then(() => console.log('Create database table'));
  await page.waitForXPath('//li[@id="process_step_configureShop" and @class="process_step success"]', {timeout: 360000}).then(() => console.log('Create shop information'));
  await page.waitForXPath('//li[@id="process_step_installFixtures" and @class="process_step success"]', {timeout: 360000}).then(() => console.log('Create demonstration data'));
  await page.waitForXPath('//li[@id="process_step_installModules" and @class="process_step success"]', {timeout: 360000}).then(() => console.log('Create install module'));
  await page.waitForXPath('//li[@id="process_step_installModulesAddons" and @class="process_step success"]', {timeout: 360000}).then(() => console.log('Create addons modules'));
  await page.waitForXPath('//li[@id="process_step_installTheme" and @class="process_step success"]', {timeout: 360000}).then(() => console.log('Create install theme'));
  await page.waitForXPath('//*[@id="install_process_success"]/div[1]/h2').then(() => console.log('Finish installation'));

  //Checking that the installation of shop is well finished
  await page.evaluate(() => document.querySelector('#install_process_success > div.clearfix > h2').textContent).then((text) => {
    expect(text).to.be.equal('Your installation is finished!');
  });

  await page.tracing.stop();
  await browser.close();
};

//downloadLatestVersion();
InstallShop();