module.exports = {
  async signInBO(traceName) {
    scenario('Login in the Back Office', client => {
      test('should open the browser', async () => {
        await client.open();
        await client.startTracing(traceName);
      });
      test('should go to the Back office', () => client.accessToBO());
      test('should login successfully in the Back Office', () => client.signInBO());
    }, 'common_client');
  },

  async signOutBO() {
    scenario('Logout from the Back Office', client => {
      test('should logout successfully from the Back Office', () => client.signOutBO());
    }, 'common_client');
  },

  async openShop(traceName) {
    scenario('Open the shop', client => {
      test('should open the browser', async () => {
        await client.open();
        await client.startTracing(traceName);
      });
      test('should open the shop', () => client.openShopURL());
    }, 'common_client')
  },

  async signInFO() {
    scenario('Login in the Front office', client => {
      test('should login successfully in the Front office', () => client.signInFO());
    }, 'common_client');
  },

  async signOutFO () {
    scenario('Logout from the Front office', client => {
      test('should logout successfully from the Front office', () => client.signOutFO());
    }, 'common_client');
  }
};
