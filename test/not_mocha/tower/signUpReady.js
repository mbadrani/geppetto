const puppeteer = require('puppeteer')
//const pixelmatch = require('pixelmatch')
//const devices = require('puppeteer/DeviceDescriptors');

let URL_QA = 'https://qa-tower.prestashop.net/signup'
let URL_STAGING = 'https://staging-tower.prestashop.net/signup'
let EMAIL = 'fredd.remi@gmail.com'
let PASSWORD = 'azerty1234'
let FIRSTNAME = 'Pierre'
let LASTNAME = 'Ralph'
let NAMESHOP = 'MyzzzShopp'


const signUpReady = async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
//  await page.emulate(devices['iPhone 6'])
  await page.goto(URL_STAGING)
  await page.setViewport({ width: 1000, height: 1000 })
  await page.waitForSelector('#page-signup1')

  await page.type('#signup1-email', EMAIL, {delay:17})
  await page.click('#signup1-password')
  await page.type('#signup1-password', PASSWORD, {delay:15})
  await page.click('.ps-clickable-but-disabled')

  await page.waitForSelector('#page-signup2')

  await page.type('#signup2-firstname', FIRSTNAME, {delay:17})
  await page.click('#signup2-lastname')
  await page.type('#signup2-lastname', LASTNAME, {delay:17})
  await page.click('.ps-clickable-but-disabled')

  await page.waitForSelector('#page-signup3')

  await page.type('#signup3-shopname', NAMESHOP, {delay:17})
  await page.click('.ps-clickable-but-disabled')

  await page.waitForSelector('#page-signup4')

  await page.click('#signup4-country')
  await page.type('#signup4-country', "FR")
  await page.keyboard.press('Enter')
  await page.click('#gtc')
  await page.click('.ps-clickable-but-disabled')

  await page.waitFor(10000)

  console.log(await page.title())
  console.log(await page.url())
  console.log("je crois qu on est bon")
  console.log("----petit recap----")
  console.log(EMAIL)
//  const emuleDevice = require('./emuleDevice')
  await browser.close()
}

signUpReady()
