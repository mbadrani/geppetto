'use strict';
let argv = require('minimist')(process.argv.slice(2));

global.dateTime = new Date().getTime();
global.firstName = 'Demo';
global.lastName = 'Prestashop';
global.email = argv.LOGIN || 'demo@prestashop.com';
global.password = argv.PASSWD || 'prestashop_demo';

global.rcTarget = argv.RC_TARGET;
global.URL = argv.URL;
global.language = argv.LANG || 'en';
global.country = argv.COUNTRY;
global.dbServer = argv.DB_SERVER;
global.dbUser = argv.DB_USER;
global.dbPassword = argv.DB_PASSWD;

global.downloadFileFolder = './test/mocha/downloads/';
global.customerEmail = 'pub@prestashop.com';
global.customerPassword = '123456789';
global.dataFileFolder = './test/mocha/datas/';

global.installFolderName = argv.INSTALL_FOLDER_NAME || '/install-dev';
global.adminFolderName = argv.ADMIN_FOLDER_NAME || '/admin-dev';
