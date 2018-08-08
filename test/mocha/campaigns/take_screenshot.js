scenario('Test mocha with puppeteer', client => {
  test('shoud open the browser', async () => {
    await client.open();
    await client.startTracing('take_screenshot');
  });
  test('shoud go to the Back office', () => client.accessToBo());
  test('shoud login successfully in the Back office', () => client.signInBo());
  test('shoud take a screenshot', async () => {
    await client.screenshot();
    await client.stopTracing();
  });
}, 'common_client', true);