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

### Tests suite

#### Available command line parameters

| Parameter           | Description      |
|---------------------|----------------- |
| URL                 | URL of your PrestaShop website (default to **http://127.0.0.1:8081/prestashop**) |
| LANG                | Language to install with (default to "en") |
| COUNTRY             | Country to install with (default to "france") |
| DB_SERVER           | DataBase server (default to "127.0.0.1") |
| DB_USER             | DataBase user (default to "root") |
| DB_PASSWD           | DataBase password (default to "doge") |
| RC_TARGET           | (Optional) Release version location directory (example: /project/) (default to '') |
| UrlStableVersion    | (Optional) Url of stable version to download (default to **https://download.prestashop.com/download/releases/prestashop_1.7.4.2.zip**) |
| ADMIN_FOLDER_NAME   | (Optional) Admin folder name (default to "admin-dev") |
| INSTALL_FOLDER_NAME | (Optional) Install folder name (default to "install-dev") |


#### Install test
If you want to run the Install test you can run the script **installPrestashop**
```
node test/not_mocha/installPrestashop.js --URL UrlOfShop --LANG language --COUNTRY country --DB_SERVER dataBaseServer --DB_USER dataBaseUsername --DB_PASSWD dataBasePassword --ADMIN_FOLDER_NAME adminFolderName --INSTALL_FOLDER_NAME installFolderName
```
If you want to run the Install test on release version you can run this script

>Notes: This script will

> 1) Download a release
> 2) Copy the ZIP file in RC_TARGET 
> 3) Extract the zip file to *prestashop* folder, 
> 3) Rename the folders admin to admin-dev and install to install-dev
```
node test/not_mocha/installPrestashop.js --LANG language --COUNTRY country --DB_SERVER dataBaseServer --DB_USER dataBaseUsername --DB_PASSWD dataBasePassword --RC_TARGET pathOfReleaseTarget --UrlStableVersion urlOfPrestashopRelease --ADMIN_FOLDER_NAME adminFolderName --INSTALL_FOLDER_NAME installFolderName
```

#### All tests

If you want to run all the mocha PR tests you can run the campaign **PR**

```
npm run PR -- --URL='http://127.0.0.1:8081/prestashop' --ADMIN_FOLDER_NAME adminFolderName
```

#### Specific test

If you want to run mocha test only on specific parts (for example PR 9095), you have to run this command:

```
TEST_PATH=PR/9095.js npm run specific-test -- --URL='http://127.0.0.1:8081/prestashop' --ADMIN_FOLDER_NAME adminFolderName
```

Use `TEST_PATH` environment variable to specify which test you want to run.

If you want to run not mocha test only on specific parts (for example PR 8237), you have to run this command:

```
node test/not_mocha/PR/8237.js --URL 'http://127.0.0.1:8081/prestashop' --ADMIN_FOLDER_NAME adminFolderName
```
