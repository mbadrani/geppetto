const puppeteer = require('puppeteer')
const Differencify = require('differencify')
const differencify = new Differencify()
//const pixelmatch = require('pixelmatch')
//const devices = require('puppeteer/DeviceDescriptors');



const screendiff = async () => {

  await differencify
    .init()
    .launch({ headless: false })
    .newPage()
    .goto('https://github.com/NimaSoroush/differencify')
    .screenshot()
    .toMatchSnapshot()
    .close()
    .end();

}

screendiff()
