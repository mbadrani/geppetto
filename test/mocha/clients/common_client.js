const puppeteer = require('puppeteer');
require('../../globals.js');
const {CommonBO} = require('../selectors/BO/commonBO');
const {Authentication} = require('../selectors/BO/authenticationPage');
const {AuthenticationFO} = require('../selectors/FO/authentication');
const {HomePage} = require('../selectors/FO/homePage');
const {Dashboard} = require('../selectors/BO/dashboardPage');
let fs = require('fs');
let options = {
  timeout: 30000,
  headless: false,
  defaultViewport: {
    width: 0,
    height: 0
  },
  args: [`--window-size=${1280},${1024}`]
};

class CommonClient {

  async open() {
    global.browser = await puppeteer.launch(options);
    global.page = await this.getPage(0)
  }

  async getPage(id) {
    const pages = await browser.pages();
    return await pages[id];
  }

  async switchWindow(id) {
    await page.waitFor(5000, {waituntil: 'networkidle2'});
    page = await this.getPage(id);
    await page.bringToFront();
    await page._client.send('Emulation.clearDeviceMetricsOverride');
  }

  async close() {
    await browser.close();
  }

  async stopTracing() {
    await page.tracing.stop();
  }

  async startTracing(testName = 'test') {
    await page.tracing.start({
      path: 'trace/' + testName + '.json',
      categories: ['devtools.timeline']
    });
  }

  async accessToBO() {
    await page.goto(global.URL + '/admin-dev');
    await page._client.send('Emulation.clearDeviceMetricsOverride');
    await this.waitFor(Authentication.page_content);
  }

  async openShopURL() {
    await page.goto(global.URL);
    await page._client.send('Emulation.clearDeviceMetricsOverride');
    await this.waitFor(HomePage.page_content);
  }

  async signInBO() {
    await this.waitForAndType(Authentication.email_input, global.email);
    await this.waitForAndType(Authentication.password_input, global.password);
    await this.waitForAndClick(Authentication.login_button);
    await this.waitFor(Dashboard.page_content);
  }

  async signOutBO() {
    await this.waitForAndClick(CommonBO.employee_infos_icon, 2000);
    await this.waitForAndClick(CommonBO.logout_button, 2000);
  }

  async signInFO() {
    await this.waitForAndClick(HomePage.sign_in_button, 1000, {visible: true});
    await this.waitForAndType(AuthenticationFO.email_input, global.customerEmail);
    await this.waitForAndType(AuthenticationFO.password_input, global.customerPassword);
    await this.waitForAndClick(AuthenticationFO.login_button);
    await this.waitFor(HomePage.page_content);
  }

  async signOutFO() {
    await this.waitFor(HomePage.sign_out_button);
    await this.waitForAndClick(HomePage.sign_out_button);
  }

  async screenshot(fileName = 'screenshot') {
    await page.waitForNavigation({waitUntil: 'domcontentloaded'});
    await page.screenshot({path: 'test/mocha/screenshots/' + fileName + global.dateTime + '.png'});
  }

  async waitForAndClick(selector, wait = 0, options = {}) {
    await this.waitFor(wait);
    await this.waitFor(selector, options);
    await page.click(selector, options);
  }

  async waitForAndClickWithEvaluate(selector, wait = 0, options = {}) {
    await this.waitFor(wait);
    await this.waitFor(selector, options);
    await page.evaluate(selector => document.querySelector(selector).click(), selector);
  }

  async waitForAndType(selector, value, wait = 0, options = {}) {
    await this.waitFor(wait);
    await this.waitFor(selector, options);
    await page.type(selector, value);
  }

  async waitFor(timeoutOrSelectorOrFunction, options = {}) {
    await page.waitFor(timeoutOrSelectorOrFunction, options);
  }

  async setDownloadBehavior() {
    await this.waitFor(4000);
    await page._client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: global.downloadFileFolder
    });
  }

  async checkDownloadFile(fileName) {
    await this.waitFor(3000);
    await fs.stat(global.downloadFileFolder + fileName, async function (err, stats) {
      await err === null && stats.isFile() ? global.existingFile = true : global.existingFile = false;
      await expect(global.existingFile, 'The file "' + fileName + '" does not exist in the "' + global.downloadFileFolder + '" folder path').to.be.true;
    });
  }

  async scrollIntoView(selector) {
    await this.waitFor(selector);
    await page.evaluate((selector) => {
      document.querySelector(selector).scrollIntoView();
    }, selector);
  }

  async uploadFile(selector, fileName) {
    const importFileInput = await page.$(selector);
    await importFileInput.uploadFile(global.downloadFileFolder + fileName);
  }

  async checkTextValue(selector, textToCheckWith, parameter = 'equal', wait = 0) {
    switch (parameter) {
      case "equal":
        await this.waitFor(wait);
        await this.waitFor(selector);
        await page.$eval(selector, el => el.innerText).then((text) => expect(text).to.equal(textToCheckWith));
        break;
      case "contain":
        await this.waitFor(wait);
        await this.waitFor(selector);
        await page.$eval(selector, el => el.innerText).then((text) => expect(text).to.contain(textToCheckWith));
        break;
    }
  }

  async accessToFO(selector, id) {
    await this.waitForAndClick(selector, 4000);
    await this.switchWindow(id);
  }

  async switchShopLanguageInFo(language = 'fr') {
    await this.waitForAndClick(HomePage.language_selector);
    await this.waitFor(1000);
    if (language === 'en') {
      await this.waitForAndClick(HomePage.language_EN);
    } else {
      await this.waitForAndClick(HomePage.language_FR);
    }
  }

  async checkURL(textToCheckWith) {
    let currentUrl = await page.target().url();
    expect(currentUrl).to.contain(textToCheckWith);
  }
  async clearInputAndSetValue(selector, text) {
    await page.click(selector);
    await page.keyboard.down('Control');
    await page.keyboard.down('A');
    await page.keyboard.up('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.type(selector, text);
  }

  async eval(selector, data, wait = 0) {
    await this.waitFor(wait);
    await page.$eval(selector, (el, value) => el.value = value, data);
  }

  async keyboardPress(key) {
    await page.keyboard.press(key);
  }

  async isEnable(selector) {
    const isEnabled = await page.$(selector + '[disabled]') === null;
    expect(isEnabled).to.be.true;
  }
}

module.exports = CommonClient;
