const authentication = require('../common_scenarios/authentication');
const trafficAndSeo = require('../common_scenarios/shopParameters/trafficAndSeo');
const importScenario = require('../common_scenarios/advancedParameters/import');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/9334
 */
scenario('PR-9334: Check download simple file, available fields and confirmation modal in import page', () => {
  authentication.signInBO('9334');
  trafficAndSeo.disableOrEnableFriendlyUrl(false);
  importScenario.downloadSimpleFileCSV('categories_import.csv');
  importScenario.checkModalConfirmation('categories_import.csv');
  trafficAndSeo.disableOrEnableFriendlyUrl();
  authentication.signOutBO();
}, 'common_client', true);