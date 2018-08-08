const puppeteer = require('puppeteer');
const {globals} = require('../../globals.js');
const {Authentication} = require('../selectors/BO/authenticationPage');
const {Dashboard} = require('../selectors/BO/dashboardPage');
let options = {
  timeout: 30000,
  headless: false,
  defaultViewport: {
    width: 0,
    height: 0
  },
  args:[`--window-size=${1280},${1024}`]
};
class CommonClient {
  async open () {
    this.browser = await puppeteer.launch(options);
    const pages = await this.browser.pages();
    this.page = await pages[0];
  }
  async close () {
    await this.browser.close();
  }
  async stopTracing() {
    await this.page.tracing.stop();
  }
  async startTracing (testName = 'test') {
    await this.page.tracing.start({
      path: 'trace/' + testName + '.json',
      categories: ['devtools.timeline']
    });
  }
  async accessToBo () {
    await this.page.goto(global.URL + '/admin-dev');
    await this.page.setViewport({width: 0, height: 0});
    await this.page.waitFor(Authentication.page_content);
  }
  async signInBo () {
    await this.page.waitFor(Authentication.email_input);
    await this.page.type(Authentication.email_input, global.email);
    await this.page.waitFor(Authentication.password_input);
    await this.page.type(Authentication.password_input, global.password);
    await this.page.click(Authentication.login_button);
    await this.page.waitFor(Dashboard.page_content);
  }
  async screenshot(fileName = 'screenshot') {
    await this.page.waitForNavigation({waitUntil: 'domcontentloaded'});
    await this.page.screenshot({path: 'test/mocha/screenshots/' + fileName + global.dateTime + '.png'});
  }
}
module.exports = CommonClient;