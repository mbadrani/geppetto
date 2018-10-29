const puppeteer = require('puppeteer');
require('../../globals.js');
const {CommonBO} = require('../selectors/BO/commonBO');
const {Authentication} = require('../selectors/BO/authenticationPage');
const {AuthenticationFO} = require('../selectors/FO/authentication');
const {HomePage} = require('../selectors/FO/homePage');
const {Dashboard} = require('../selectors/BO/dashboardPage');
const {Menu} = require('../selectors/BO/menu');
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
global.tab = [];
global.selectedValue = [];

class CommonClient {

  async open() {
    global.browser = await puppeteer.launch(options);
    global.page = await this.getPage(0)
  }

  async getPage(id) {
    const pages = await browser.pages();
    return await pages[id];
  }

  async switchWindow(id, wait = 0) {
    await page.waitFor(5000, {waituntil: 'networkidle2'});
    await this.waitFor(wait);
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
    await page.goto(global.URL + global.adminFolderName);
    await page._client.send('Emulation.clearDeviceMetricsOverride');
    await this.waitFor(Authentication.page_content);
  }

  async accessToFO(selector, id, wait = 4000) {
    await this.waitForAndClick(selector, wait);
    await this.switchWindow(id, wait);
  }

  async openShopURL(param = '') {
    await page.goto(global.URL + param);
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
    await page.screenshot({path: 'test/mocha/screenshots/' + fileName + global.dateTime + '.png'});
  }

  async waitForAndClick(selector, wait = 0, options = {}) {
    await this.waitFor(wait);
    await this.waitFor(selector, options);
    await page.click(selector, options);
  }

  async waitForAndType(selector, value, wait = 0, options = {}) {
    await this.waitFor(wait);
    await this.waitFor(selector, options);
    await page.type(selector, value);
  }

  async waitForAndSetValue(selector, value, wait = 0, options = {}) {
    await this.waitFor(wait);
    await this.waitFor(selector, options);
    await page.$eval(selector, (el, value) => el.value = value, value);
  }

  async waitFor(timeoutOrSelectorOrFunction, options = {}) {
    await page.waitFor(timeoutOrSelectorOrFunction, options);
  }

  async searchByValue(nameSelector, buttonSelector, value) {
    await this.waitFor(nameSelector);
    await this.waitForAndType(nameSelector, value, 2000);
    await this.waitForAndClick(buttonSelector);
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

  async uploadFile(selector, fileFolder, fileName) {
    const inputFile = await page.$(selector);
    await inputFile.uploadFile(fileFolder + fileName);
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

  async checkAttributeValue(selector, attribute, textToCheckWith, parameter = 'equal', wait = 0) {
    await page.waitFor(wait);
    await page.$eval(selector, (el, attribute) => el.getAttribute(attribute), attribute).then((value) => {
      switch (parameter) {
        case 'contain': {
          expect(value).to.be.contain(textToCheckWith);
          break;
        }
        default: {
          expect(value).to.be.equal(textToCheckWith);
          break;
        }
      }
    });
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

  async clearInputAndSetValue(selector, text, wait = 0) {
    await this.waitFor(wait);
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

  async waitForAndSelect(selector, value, wait = 0) {
    await page.waitFor(wait);
    await page.waitFor(selector);
    await page.select(selector, value);
  }

  async confirmationDialog(action = 'accept') {
    switch (action) {
      case "accept":
        await page.on("dialog", (dialog) => {
          dialog.accept();
        });
        break;
      default :
        await page.on("dialog", (dialog) => {
          dialog.dismiss();
        });
    }
  }

  async checkBrowserMessage(textToCheckWith) {
    await page.on('error', error => {
      console.log(error);
      for (let i = 0; i < msg.args().length; i++) {
        expect(msg.args()[i].to.contain(textToCheckWith))
      }
    });
  }

  async isExisting(selector, wait = 0) {
    await page.waitFor(wait);
    const exists = await page.$(selector) !== null;
    expect(exists).to.be.true;
  }

  async isNotExisting(selector, wait = 0) {
    await page.waitFor(wait);
    const exists = await page.$(selector) === null;
    expect(exists).to.be.true;
  }

  async isVisible(selector, wait = 0, options = {}) {
    await this.waitFor(wait, options);
    global.visible = await page.$(selector) !== null;
  }

  async getBaseUrl(globalVariable) {
    global.tab[globalVariable] = await page.url();
  }

  async switchShop(isSelected = 'All shop') {
    await this.waitForAndClick(Menu.dashboard_menu);
    await this.waitForAndClick(CommonBO.shopname_button, 1000);
    await page.waitFor(1000);
    let index = 1;
    if (isSelected !== 'All shop') {
      index = await isSelected === 'First shop' ? 3 : 4;
    }
    await page.waitFor(2000);
    await this.waitForAndClick(CommonBO.shopname_option.replace('%ID', index));
    await page.waitFor(3000);
  }

  stringifyNumber(number) {
    let special = ['zeroth', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
    let deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];
    if (number < 20) return special[number];
    if (number % 10 === 0) return deca[Math.floor(number / 10) - 2] + 'ieth';
    return deca[Math.floor(number / 10) - 2] + 'y-' + special[number % 10];
  }

  async closeWindow() {
    await page.close();
  }

  async getSelectedValue(selector, value) {
    await page.waitForSelector(selector, {timeout: 90000});
    global.selectedValue = await page.select(selector, value);
  }

  async checkSelectedValue(selector, textToCheckWith, wait = 0) {
    await this.waitFor(wait);
    await this.waitFor(selector);
    await page.$eval(selector + ' > option[selected]', el => el.innerText).then((text) => expect(text).to.equal(textToCheckWith));
  }

  async checkValidationInput(selector, textToCheckWith) {
    await this.waitFor(selector);
    await page.$eval(selector, (el) => el.title).then((title) => {
      expect(title).to.equal(textToCheckWith);
    });
  }
}

module.exports = CommonClient;
