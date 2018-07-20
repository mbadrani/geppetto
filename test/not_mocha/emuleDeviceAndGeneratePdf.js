const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors');

const emuleDeviceAndGeneratePDF = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.emulate(devices['iPhone 6'])
  await page.goto('https://google.com/')
  await page.screenshot({
    path: 'thomas.png',
    fullPage: true
  })
  await page.emulateMedia('screen')
  await page.pdf({path: 'thomas.pdf'})
  console.log(await page.title())
  await browser.close()
}

emuleDeviceAndGeneratePDF()
