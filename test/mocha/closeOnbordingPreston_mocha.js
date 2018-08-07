const assert = require('assert')
const puppeteer = require('puppeteer')

let URL_BO = 'http://localhost/ps_1742-rc1/admin638nuy7y6/'
//let URL_BO = 'http://localhost:8001/admin-dev/'
let EMAIL = 'demo@prestashop.com'
let PASSWORD = 'prestashop_demo'
let browser
let page

before(async () => {
  browser = await puppeteer.launch({ headless: false })
  page = await browser.newPage()
})

describe('close Onbording Preston', () => {

  it('connect itself', async () => {
    await page.setViewport({ width: 1500, height: 2500 })
    await page.goto(URL_BO)
    await page.type('#email', EMAIL)
    await page.type('#passwd', PASSWORD)
    await page.click('#submit_login')
  }).timeout(20000)

  it('verify popup onboarding', async () => {
    await page.waitFor('.welcome')
    await page.waitFor('.btn-tertiary-outline')
    await page.click('.btn-tertiary-outline')
    console.log("Preston closed")
    await page.waitFor(6500)
  }).timeout(20000)

})

after(async () => {
  await browser.close()
})
