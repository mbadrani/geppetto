const puppeteer = require('puppeteer')

const simulatefoclient = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.tracing.start({
    path: 'trace.json',
    categories: ['devtools.timeline']
  })
  await page.goto('https://nairobi.qa-prestashopready.net/')

  await page.setViewport({ width: 1500, height: 2000 })
  await page.waitFor('body')

  await page.goto('https://nairobi.qa-prestashopready.net/accessoires/3-mug-the-best-is-yet-to-come.html')
  await page.waitFor(3000)
  await page.click("[data-button-action='add-to-cart']")
  await page.waitFor(5000)

/*
  await page.type('#email', '1529415040370pub1529414081011@prestashop.com')
  await page.type('#passwd', 'azerty1234')
  await page.click('#submit_login')
  await page.waitFor('header')
  await page.click('#subtab-AdminParentModulesSf')
//  await page.waitFor('#modules-list-container-all')
  await page.waitFor('h3.text-ellipsis.module-name-list')

  // execute standard javascript in the context of the page.
*/





//  console.log(themes_name)
//  await page.tracing.stop();
  await browser.close()
  }

simulatefoclient()
