const {Menu} = require('../../../selectors/BO/menu');
const {TraficAndSeo} = require('../../../selectors/BO/configure/shopParameters/trafficAndSeoPage');

module.exports = {
  async disableOrEnableFriendlyUrl(enable = true) {
    scenario('Disable or enable the friendly url', client => {
      test('should go to "Traffic & SEO" page', async () => {
        await client.waitForAndClick(Menu.Configure.ShopParameters.shop_parameters_menu, 2000);
        await client.waitForAndClick(Menu.Configure.ShopParameters.traffic_seo_submenu, 2000, {visible: true});
      });
      if (enable) {
        test('should click on "Yes" button to enable "Friendly url"', () => client.waitForAndClick(TraficAndSeo.SeoAndUrlsPage.friendly_url_button.replace('%S', '1')));
      } else {
        test('should click on "No" button to disable "Friendly url"', () => client.waitForAndClick(TraficAndSeo.SeoAndUrlsPage.friendly_url_button.replace('%S', '0')));
      }
      test('should click on "Save" button', () => client.waitForAndClick(TraficAndSeo.SeoAndUrlsPage.save_button));
    }, 'common_client');
  }
};