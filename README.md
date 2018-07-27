[![Prestashop](https://i.imgur.com/qDqeQ1E.png)](https://www.prestashop.com)

# How to Install Geppetto project 
Clone this repo and run them directy with a simple `node` command.

```bash
git clone https://github.com/myrepo
cd geppetto
npm i puppeteer
```
This project integrates Puppeteer and Mocha to create tests suits on PrestaShop Shop
Puppeteer Headless Chrome Project for real life use cases.

Interesting links to begin developping on Puppeteer:
Non-Regression test
project puppeteer
https://github.com/GoogleChrome/puppeteer
Puppeteer > API
https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#

UI testing
projet differencify
https://github.com/NimaSoroush/differencify
differencify > API
https://github.com/NimaSoroush/differencify/blob/master/API.md

#### Install test
If you want to run the Install test you can run the script **installPrestashop**
```
node test/not_mocha/installPrestashop.js --URL UrlOfShop --LANG language - --COUNTRY country -DB-DB_SERVER dataBaseServer --DB_USER dataBaseUsername --DB_PASSWD dataBasePassword --RCTARGET lastStableVersionLocation

```

* **URL**: **(Required)** Front office URL of your PrestaShop website with the “http://”
* **LANG**: **(Optional)** Language to install with (default to "en")
* **COUNTRY**: **(Optional)** Country to install with (default o "france")
* **DB_SERVER**: **(Optional)** DataBase server (default to "mysql")
* **DB_USER**: **(Optional)** DataBase user (default to "root")
* **DB_PASSWD**: **(Optional)** DataBase password (default to "doge")
* **RCTARGET**: **(Required)** Last stable version location directory (example: /project/prestashop1724/)