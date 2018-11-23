'use strict';

let CommonClient = require('./common_client');
const excelToJson = require('convert-excel-to-json');
const MongoClient = require('mongodb').MongoClient;

global.getAllSelectors = [];

/**
 *
 * Example of authentication to mongoDB server
 * All params must be mentioned in the command line (e.g: TEST_PATH=checkAllSelectors/02_orders/checkAllSelectorsInOrderPage.js npm run specific-test -- --URL=shopUrl --MONGO_URL='mongoUrl' --MONGO_DATABASE='database_name')
 * mongoUrl = 'mongodb://username:password@host:port' (required);
 * mongoDatabase = 'database_name'  (required);
 */

class SelectorsClient extends CommonClient {

  async saveExcelFileIntoMongoDB(sheetName = 'Back_office') {
    const result = excelToJson({
      sourceFile: _projectdir + '/test/mocha/uimap/UI_Map_Referential.xlsx',
      header: {
        rows: 2
      },
      columnToKey: {
        A: 'menu',
        B: 'page',
        C: 'name',
        D: 'object',
        E: 'UImap_name',
        F: 'selector'
      },
      sheets: [sheetName]
    });

    if (result[sheetName].length > 0) {
      //Use connect method to connect to the server
      MongoClient.connect(mongoUrl, async function (err, client) {
        await expect(err, "Failed to connect to the server!!").to.be.null;
        const db = await client.db(mongoDatabase);
        db.listCollections({name: sheetName})
          .next(async function (err, collectionName) {
            if (collectionName === null) {
              let uimapSelectors = await db.createCollection(sheetName);
              //Insert data into mongo database
              for (let i = 0; i < result[sheetName].length; i++) {
                await uimapSelectors.insertOne(
                  result[sheetName][i]
                  , async function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.not.be.null;
                  });
              }
              await uimapSelectors.updateMany({}, {
                $set: {
                  "is_valid": true,
                  "date": new Date()
                }
              }, async function (err, res) {
                expect(err).to.be.null;
                await client.close();
              });
            } else {
              await client.close();
            }
          });
      });
    }
  }

  async checkNotEmptyCollection(sheetName = 'Back_office') {
    MongoClient.connect(mongoUrl, async function (err, client) {
      await client.db(mongoDatabase).collection(sheetName, async function (err, res) {
        await expect(err).to.be.null;
        await expect(res).to.not.be.null;
      });
      await client.close();
    });
  }

  async getSelectors(menuName, pageName) {
    await page.evaluate(async (menuName, pageName) => {
      let getSelectorPage = [];
      let elements = document.querySelectorAll("*");
      let ids = [].map.call(elements, function (elem) {
        if (elem.id) {
          let menu = pageName === 'authentification' ? '---' : menuName;
          return {
            Menu: menu,
            Page: pageName,
            UImap_selector: '#' + elem.id,
            exist: true,
            Version: '1.7.5.0'
          };
        }
      });
      Object.keys(ids).forEach(function (item) {
        if (ids[item] !== undefined) {
          getSelectorPage.push(ids[item]);
        }
      });
      return getSelectorPage;
    }, menuName, pageName).then(async (getSelectorPage) => {
      getAllSelectors.push(...new Set(getSelectorPage.map(item => item.UImap_selector)));
    });
  }

  async compareSelectors(menuName, pageName, sheetName = 'Back_office') {
    MongoClient.connect(mongoUrl, async function (err, client) {
      expect(err, "Failed to connect to the server!!").to.be.null;
      let uimapSelectors = await client.db(mongoDatabase).collection(sheetName);
      await expect(uimapSelectors).to.not.be.null;
      await uimapSelectors.find({
        page: pageName
      }).toArray(async function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          for (let i = 0; i < result.length; i++) {
            if (!getAllSelectors.includes(result[i].selector)) {
              await uimapSelectors.updateMany({_id: result[i]._id}, {$set: {"is_valid": false}});
            }
          }
        }
        getAllSelectors = [];
        await client.close();
      });
    });
  }
}

module.exports = SelectorsClient;