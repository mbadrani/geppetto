const puppeteer = require('puppeteer')

const getListOfModules = async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.tracing.start({
    path: 'trace.json',
    categories: ['devtools.timeline']
  })
  await page.goto('https://robustesseshop1529415045772.staging-prestashopready.net/backoffice/')

  await page.setViewport({ width: 1500, height: 2000 })
  await page.waitFor('body')
  await page.type('#email', '1529415040370pub1529414081011@prestashop.com')
  await page.type('#passwd', 'azerty1234')
  await page.click('#submit_login')
  await page.waitFor('header')
  await page.click('#subtab-AdminParentModulesSf')
//  await page.waitFor('#modules-list-container-all')
  await page.waitFor('h3.text-ellipsis.module-name-list')

  // execute standard javascript in the context of the page.
  const modules_name = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('h3.text-ellipsis.module-name-list'))
    return anchors.map(anchor => anchor.innerText)

  })

  const modules_versions = await page.evaluate(() => {
    const anchors_version = Array.from(document.querySelectorAll('span.text-ellipsis.small-text'))
    return anchors_version.map(anchor => anchor.innerText)

  })

  const themes_name = await page.evaluate(() => {
    const anchors_mod = Array.from(document.querySelectorAll('#modules-list-container-theme'))
//    const anchors = Array.from(document.querySelectorAll('#modules-list-container-theme > h3.text-ellipsis.module-name-list'))
    return anchors_mod.map(anchor => anchor.innerText)

  })
  console.log(modules_name)
  console.log(modules_versions)
  console.log(themes_name)
  await page.tracing.stop();
  await browser.close()
  }

getListOfModules()
