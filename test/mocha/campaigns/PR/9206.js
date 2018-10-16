const authentication = require('../common_scenarios/authentication');
const onBoarding = require('../common_scenarios/onboarding');
const sqlQueryScenario = require('../common_scenarios/advancedParameters/database');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9206
 */

let sqlQueryData = [
  {
    name: 'shop' + dateTime,
    sql: 'select * from ps_shop;'
  },
  {
    name: 'address' + dateTime,
    sql: 'select * from ps_address;'
  },
  {
    name: 'advice' + dateTime,
    sql: 'select * from ps_advice;'
  }];

scenario('PR-9206: Check the SQL manager page', () => {
  authentication.signInBO('9206');
  onBoarding.closeOnBoardingModal();
  onBoarding.stopOnBoarding();
  for (let i = 0; i < sqlQueryData.length; i++) {
    sqlQueryScenario.createSqlQuery(sqlQueryData[i]);
  }
  sqlQueryScenario.deleteSqlQuery(sqlQueryData[0]);
  sqlQueryScenario.deleteSqlQueryWithBulkAction();
  authentication.signOutBO();
}, 'common_client', true);