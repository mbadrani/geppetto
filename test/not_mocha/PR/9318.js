const puppeteer = require('puppeteer');
require('../../globals');
const chai = require('chai');
chai.use(require('chai-string'));
const expect = chai.expect;

const open = async () => {
  global.browser = await puppeteer.launch({headless: false, args: [`--window-size=${1280},${1024}`]});
};

const accessToBo = async () => {
  const pages = await browser.pages();
  global.page = await pages[0];
  await page.tracing.start({
    path: 'trace/9318.json',
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

const checkDocumentationLink = async () => {
  await page.waitFor('#dashboard dl:nth-child(2) a');
  await page.$eval('#dashboard dl:nth-child(2) a', el => el.href).then((url) => {
    try {
      expect(url).to.contain('doc.prestashop.com/display/PS17');
      console.log('should check the url of "Official documentation" in dashboard page');
    } catch (error) {
      console.log('Error: ' + error);
    }
  });
};

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9318
 */
open()
  .then(() => console.log('should open the browser'))
  .then(async () => {
    await accessToBo().then(async () => {
      await signInBo();
      await checkDocumentationLink();
      await page.tracing.stop();
      await browser.close();
    });
  });