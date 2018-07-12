const puppeteer = require('puppeteer')

const getListOfModules = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.tracing.start({
    path: 'traceaddproduct.json',
    categories: ['devtools.timeline']
  })
  await page.goto('https://robustesseshop1529415045772.staging-prestashopready.net/backoffice/')

  await page.setViewport({ width: 1500, height: 2000 })
  await page.waitFor('body')
  await page.type('#email', '1529415040370pub1529414081011@prestashop.com')
  await page.type('#passwd', 'azerty1234')
  await page.click('#submit_login')
  await page.waitFor('header')
  await page.click('#subtab-AdminCatalog')
  await page.waitFor('#page-header-desc-configuration-add')
  await page.click('#page-header-desc-configuration-add')


  await page.tracing.stop();
  await browser.close()
  }

getListOfModules()
