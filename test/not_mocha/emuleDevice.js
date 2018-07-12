const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors');

const emuleDevice = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.emulate(devices['iPhone 6'])
  await page.goto('https://google.com/')
  await page.screenshot({
    path: 'full.png',
    fullPage: true
  })
  console.log(await page.title())
  await browser.close()
}

emuleDevice()
