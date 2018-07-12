const puppeteer = require('puppeteer')
//const devices = require('puppeteer/DeviceDescriptors');

let EMAIL = 'thomas.remi@gmail.com'
let PASSWORD = 'azerty1234'

const signInReady = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
//  await page.emulate(devices['iPhone 6'])
  await page.goto('https://qa-tower.prestashop.net/signin')
  await page.setViewport({ width: 1000, height: 1000 })
  await page.waitForSelector('#page-signin')
//  await page.waitFor(4000)
//  await page.type('div.ui.input.material.ui.fluid.error', 'gmail')
//  await page.type('input[type="email"]', 'matadorromulad@gmail.com', {delay:15})
  await page.type('input[type="email"]', EMAIL, {delay:15})
  await page.type('input[type="password"]', PASSWORD, {delay:15})
  await page.click('button')
  await page.waitFor(2000)
/*  await page.screenshot({
    path: 'full.png',
    fullPage: true
  })
*/
  console.log(await page.title())
  const emuleDevice = require('./emuleDevice')
  await browser.close()
}

signInReady()
