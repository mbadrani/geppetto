const puppeteer = require('puppeteer')
const Differencify = require('differencify')
const differencify = new Differencify()

let URL_BO = 'http://localhost:8001/admin-dev/'
let EMAIL = 'demo@prestashop.com'
//let PASSWORD = 'prestashop_demo'
let PASSWORD = 'prestashop'

const screendiff = async () => {

  await differencify
    .init()
    .launch({ headless: true })
    .newPage()
    .setViewport({ width: 1600, height: 2500 })
    .goto(URL_BO)

    .waitFor(2000)

    .type('#email', EMAIL)
    .type('#passwd', PASSWORD)
    .click('#submit_login')

    .waitFor(3000)
    .screenshot()
//    .toMatchSnapshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Dashboard------");
      console.log(screen_result);
    })
/*    .result((result) => {
      console.log(result); // Prints true or false
    })*/

//=============================Orders============================>
    .click('#subtab-AdminParentOrders')
    .waitFor(800)
    .waitFor('#subtab-AdminOrders')
    .click('#subtab-AdminOrders')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Orders > orders------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminInvoices')
    .click('#subtab-AdminInvoices')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Orders > invoices------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminSlip')
    .click('#subtab-AdminSlip')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Orders > credit slips------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminDeliverySlip')
    .click('#subtab-AdminDeliverySlip')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Orders > delivery slips------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminCarts')
    .click('#subtab-AdminCarts')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Orders > shopping carts------");
      console.log(screen_result);
    })

  //=============================Catalog============================>
    .click('#subtab-AdminCatalog')
    .waitFor(800)
    .waitFor('#subtab-AdminProducts')
    .click('#subtab-AdminProducts')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Catalog > products------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminCategories')
    .click('#subtab-AdminCategories')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Catalog > Categories------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminTracking')
    .click('#subtab-AdminTracking')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Catalog > monitoring------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminParentAttributesGroups')
    .click('#subtab-AdminParentAttributesGroups')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Catalog > attributes&features------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminParentManufacturers')
    .click('#subtab-AdminParentManufacturers')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Catalog > brands&suppliers------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminAttachments')
    .click('#subtab-AdminAttachments')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Catalog > files------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminParentCartRules')
    .click('#subtab-AdminParentCartRules')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Catalog > discounts------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminStockManagement')
    .click('#subtab-AdminStockManagement')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Catalog > stocks------");
      console.log(screen_result);
    })

//=============================Customers============================>

    .click('#subtab-AdminParentCustomer')
    .waitFor(800)
    .waitFor('#subtab-AdminCustomers')
    .click('#subtab-AdminCustomers')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Customer > customer------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminAddresses')
    .click('#subtab-AdminAddresses')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Customer > Addresses------");
      console.log(screen_result);
    })

//=============================Customers service=======================>

    .click('#subtab-AdminParentCustomerThreads')
    .waitFor(800)
    .waitFor('#subtab-AdminCustomerThreads')
    .click('#subtab-AdminCustomerThreads')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Customer service > customer service------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminOrderMessage')
    .click('#subtab-AdminOrderMessage')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Customer service > Order messages------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminReturn')
    .click('#subtab-AdminReturn')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Customer service > Merchandise returns------");
      console.log(screen_result);
    })

//=============================Stats=======================>

    .waitFor('#subtab-AdminStats')
    .click('#subtab-AdminStats')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Stats------");
      console.log(screen_result);
    })

//=============================Modules=======================>

    .click('#subtab-AdminParentModulesSf')
    .waitFor(800)
    .waitFor('#subtab-AdminModulesSf')
    .click('#subtab-AdminModulesSf')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Modules > Modules services------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminAddonsCatalog')
    .click('#subtab-AdminAddonsCatalog')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Modules > Modules catalog------");
      console.log(screen_result);
    })

    //=============================Design=======================>

    .click('#subtab-AdminParentThemes')
    .waitFor(800)
    .waitFor('#subtab-AdminThemes')
    .click('#subtab-AdminThemes')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Design > Theme logo------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminThemesCatalog')
    .click('#subtab-AdminThemesCatalog')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Design > Theme catalog------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminCmsContent')
    .click('#subtab-AdminCmsContent')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Design > Pages------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminModulesPositions')
    .click('#subtab-AdminModulesPositions')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Design > Positions------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminImages')
    .click('#subtab-AdminImages')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Design > Image settings------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminLinkWidget')
    .click('#subtab-AdminLinkWidget')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Design > Link widget------");
      console.log(screen_result);
    })

    //=============================Shipping=======================>

    .click('#subtab-AdminParentShipping')
    .waitFor(800)
    .waitFor('#subtab-AdminCarriers')
    .click('#subtab-AdminCarriers')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Shipping > Carriers------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminShipping')
    .click('#subtab-AdminShipping')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Shipping > Preferences------");
      console.log(screen_result);
    })

    //=============================Payment=======================>

    .click('#subtab-AdminParentPayment')
    .waitFor(800)
    .waitFor('#subtab-AdminPayment')
    .click('#subtab-AdminPayment')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Payment > Payment Methods------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminPaymentPreferences')
    .click('#subtab-AdminPaymentPreferences')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Payment > Preferences------");
      console.log(screen_result);
    })

    //=============================International=======================>

    .click('#subtab-AdminInternational')
    .waitFor(800)
    .waitFor('#subtab-AdminParentLocalization')
    .click('#subtab-AdminParentLocalization')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------International > Localization------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminParentCountries')
    .click('#subtab-AdminParentCountries')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------International > Location------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminParentTaxes')
    .click('#subtab-AdminParentTaxes')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------International > Taxes------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminTranslations')
    .click('#subtab-AdminTranslations')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------International > Translations------");
      console.log(screen_result);
    })

    //=============================Shop parameters=======================>

    .click('#subtab-ShopParameters')
    .waitFor(800)
    .waitFor('#subtab-AdminParentPreferences')
    .click('#subtab-AdminParentPreferences')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Shop parameters > General------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminParentOrderPreferences')
    .click('#subtab-AdminParentOrderPreferences')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Shop parameters > Order settings------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminPPreferences')
    .click('#subtab-AdminPPreferences')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Shop parameters > Products settings------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminParentCustomerPreferences')
    .click('#subtab-AdminParentCustomerPreferences')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Shop parameters > Customer settings------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminParentStores')
    .click('#subtab-AdminParentStores')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Shop parameters > Contact------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminParentMeta')
    .click('#subtab-AdminParentMeta')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Shop parameters > Traffic SEO------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminParentSearchConf')
    .click('#subtab-AdminParentSearchConf')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Shop parameters > Search------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminGamification')
    .click('#subtab-AdminGamification')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Shop parameters > Merchant expertise------");
      console.log(screen_result);
    })

    //=============================Advanced parameters=======================>

    .click('#subtab-AdminAdvancedParameters')
    .waitFor(800)
    .waitFor('#subtab-AdminInformation')
    .click('#subtab-AdminInformation')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Advanced parameters > Informations------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminPerformance')
    .click('#subtab-AdminPerformance')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Advanced parameters > Performance------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminAdminPreferences')
    .click('#subtab-AdminAdminPreferences')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Advanced parameters > Administration------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminEmails')
    .click('#subtab-AdminEmails')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Advanced parameters > Email------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminImport')
    .click('#subtab-AdminImport')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Advanced parameters > Import------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminParentEmployees')
    .click('#subtab-AdminParentEmployees')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Advanced parameters > Team------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminParentRequestSql')
    .click('#subtab-AdminParentRequestSql')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Advanced parameters > Database------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminLogs')
    .click('#subtab-AdminLogs')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Advanced parameters > Logs------");
      console.log(screen_result);
    })

    .waitFor('#subtab-AdminWebservice')
    .click('#subtab-AdminWebservice')
    .waitFor(3000)
    .screenshot()
    .toMatchSnapshot((screen_result) => {
      console.log("-------Advanced parameters > Webservice------");
      console.log(screen_result);
    })

    .close()
    .end();
}

screendiff()
.then(value => {
  console.log("the end")
})
.catch(e => console.log(`error: ${e}`))
