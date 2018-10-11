const puppeteer = require('puppeteer');
require('../../globals');

const checkSearchPage = async () => {
  const browser = await puppeteer.launch({headless: false, args: [`--window-size=${1280},${1024}`]});
  const pages = await browser.pages();
  const page = await pages[0];
  await page.tracing.start({
    path: 'trace/9358.json',
    categories: ['devtools.timeline']
  });

  await page.goto(global.URL + '/admin-dev');
  await page._client.send('Emulation.clearDeviceMetricsOverride');
  await page.waitFor('body');
  await page.type('#email', global.email);
  await page.type('#passwd', global.password);
  await page.click('#submit_login');
  await page.waitFor('header');
  await page.type('#bo_query', 'recherche');
  await page.keyboard.press('Enter');
  await page.waitForSelector('#content > div.row', {visible: true, timeout: 30000});
  await page.tracing.stop();
  await browser.close();
};

checkSearchPage();
