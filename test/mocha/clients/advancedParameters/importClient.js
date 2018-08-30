let CommonClient = require('../common_client');

class ImportClient extends CommonClient {
  async checkAvailableFields(selector, peventName) {
    if (peventName === 'response') {
      await page.on(peventName, async (res) => {
        // allow XHR only
        if ('xhr' === res.request().resourceType() && res.request().url().indexOf('getAvailableFields') > 0) {
          res.text().then(async function (textBody) {
            try {
              let obj = JSON.parse(textBody);
              global.availableFields = await page.$eval(selector, el => el.innerText);
              await obj.forEach(async (value) => {
                const textField = await page.evaluate((field) => {
                  let el = document.createElement('div');
                  el.innerHTML = field;
                  return el.innerText;
                }, value["field"]);
                expect(availableFields).to.contain(textField);
              });
            } catch (error) {
              console.log('Error: ' + error);
            }
          });
        }
      });
    }
  }

  async checkDialog(selecor, wait) {
    await this.waitFor(wait);
    await page.on("dialog", async (dialog) => {
      if(dialog) {
        await this.waitFor(wait);
        await dialog.dismiss();
      }
      return await expect(dialog).to.be.not.null;

    });
    await this.waitForAndClick(selecor, wait);
  }
}
module.exports = ImportClient;
