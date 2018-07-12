const puppeteer = require('puppeteer')
const pixelmatch = require('pixelmatch')
//const devices = require('puppeteer/DeviceDescriptors');

let EMAIL = 'thomas.remi@gmail.com'
let PASSWORD = 'azerty1234'
let FIRSTNAME = 'Pierre'
let LASTNAME = 'Ralph'


const signUpReady = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
//  await page.emulate(devices['iPhone 6'])
  await page.goto('https://qa-tower.prestashop.net/signup')
  await page.setViewport({ width: 1000, height: 1000 })
  await page.waitForSelector('#page-signup1')

  await page.type('input[type="email"]', EMAIL, {delay:17})
  await page.type('input[type="password"]', PASSWORD, {delay:15})
  await page.click('button')
  await page.waitFor(2000)

  await page.waitForSelector('#page-signup2')

//  const firstname = document.querySelectorAll('input[type="text"]')[0]
/*  const firstname = await page.evaluate(() => document.querySelectorAll('input[type="text"]')[0])
  console.log(document.querySelectorAll('input[type="text"]')[0])
*/

//  const linkHandlers = await page.$x('#page-signup2')
//  const linkHandlers = await page.$x('//*[@id="app"]/div[2]/div[2]/div[2]/form/div/div[4]/input')
//  const linkHandlers = (await page.$x('//*[@id="app"]/div[2]/div[2]/div[2]/form/div/div[4]/input'))[0]
//  const linkHandlers = await page.$x('//*[@id="page-signup2"]/div[2]/form/div/div[4]/input')
//  const linkHandlers = await page.$x("//a[contains(text(), 'Last name')]")

  const teston = await page.$x('//*[@id="app"]/div[2]/div[2]/div[2]/form/div/div[4]/input')
  const tetar = document.querySelector(teston)

  await page.type('input[type="text"]', FIRSTNAME, {delay:15})
//  await page.type(linkHandlers , LASTNAME, {delay:15})
//  await page.type(teston , LASTNAME, {delay:15})

//  await page.type('input[type="text"]'[4], FIRSTNAME, {delay:15})
//  await page.type('div.ui.input.material.fluid', LASTNAME, {delay:15})

  await page.waitFor(2000)



/*  await page.screenshot({
    path: 'full.png',
    fullPage: true
  })
*/
  console.log(tetar)
  console.log(await page.title())
  const emuleDevice = require('./emuleDevice')
  await browser.close()
}

signUpReady()
