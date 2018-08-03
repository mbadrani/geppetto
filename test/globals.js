'use strict';
let argv = require('minimist')(process.argv.slice(2));

global.dateTime = new Date().getTime();
global.firstName = 'Demo';
global.lastName = 'Prestashop';
global.email = 'demo@prestashop.com';
global.password = 'prestashop_demo';

global.rcTarget = argv.RC_TARGET;
global.URL = argv.URL;
global.language = argv.LANG;
global.country = argv.COUNTRY;
global.dbServer = argv.DB_SERVER;
global.dbUser = argv.DB_USER;
global.dbPassword = argv.DB_PASSWD;