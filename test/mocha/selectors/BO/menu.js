module.exports = {
  Menu: {
    dashboard_menu: '#tab-AdminDashboard',
    Sell: {
      Orders: {
        orders_menu: '#subtab-AdminParentOrders',
        orders_submenu: '#subtab-AdminOrders',
        invoices_submenu: '#subtab-AdminInvoices',
        credit_slips_submenu: '#subtab-AdminSlip',
        delivery_slips_submenu: '#subtab-AdminDeliverySlip',
        shopping_carts_submenu: '#subtab-AdminCarts'
      },
      Catalog: {
        catalog_menu: '#subtab-AdminCatalog',
        products_submenu: '#subtab-AdminProducts',
        category_submenu: '#subtab-AdminCategories',
        monitoring_submenu: '#subtab-AdminTracking',
        attributes_features_submenu: '#subtab-AdminParentAttributesGroups',
        feature_tab: '#subtab-AdminFeatures',
        manufacturers_submenu: '#subtab-AdminParentManufacturers',
        supplier_tab: '#subtab-AdminSuppliers',
        files_submenu: '#subtab-AdminAttachments',
        discounts_submenu: '#subtab-AdminParentCartRules',
        catalog_price_rules_tab: '#subtab-AdminSpecificPriceRule',
        stocks_submenu: '#subtab-AdminStockManagement',
        stock_tab: '#head_tabs li:nth-child(1) a',
        movement_tab: '#head_tabs li:nth-child(2) a'
      },
      Customers: {
        customers_menu: '#subtab-AdminParentCustomer',
        customers_submenu: '#subtab-AdminCustomers',
        addresses_submenu: '#subtab-AdminAddresses'
      },
      CustomerService: {
        customer_service_menu: '#subtab-AdminParentCustomerThreads',
        customer_service_submenu: '#subtab-AdminCustomerThreads',
        order_messages_submenu: '#subtab-AdminOrderMessage',
        merchandise_returns_submenu: '#subtab-AdminReturn'
      },
      Stats: {
        stats_menu: '#subtab-AdminStats',
      }
    },
    Improve: {
      Modules: {
        modules_menu: '#subtab-AdminParentModulesSf',
        modules_services_submenu: '#subtab-AdminModulesSf',
        installed_modules_tabs: '#subtab-AdminModulesManage',
        notifications_tabs: '#subtab-AdminModulesNotifications',
        selection_tab: '#subtab-AdminModulesCatalog',
        modules_catalog_submenu: '#subtab-AdminAddonsCatalog',
      },
      Design: {
        design_menu: '#subtab-AdminParentThemes',
        theme_logo_submenu: '#subtab-AdminThemesParent',
        theme_catalog_submenu: '#subtab-AdminThemesCatalog',
        pages_submenu: '#subtab-AdminCmsContent',
        positions_submenu: '#subtab-AdminModulesPositions',
        image_settings_submenu: '#subtab-AdminImages',
        link_widget_submenu: '#subtab-AdminLinkWidget'
      },
      Shipping: {
        shipping_menu: '#subtab-AdminParentShipping',
        carriers_submenu: '#subtab-AdminCarriers',
        preferences_submenu: '#subtab-AdminShipping'
      },
      Payment: {
        payment_menu: '#subtab-AdminParentPayment',
        payment_methods_submenu: '#subtab-AdminPayment',
        preferences_submenu: '#subtab-AdminPaymentPreferences'
      },
      International: {
        international_menu: '#subtab-AdminInternational',
        localization_submenu: '#subtab-AdminParentLocalization',
        languages_tab: '#subtab-AdminLanguages',
        currencies_tab: '#subtab-AdminCurrencies',
        geolocation_tab: '#subtab-AdminGeolocation',
        locations_submenu: '#subtab-AdminParentCountries',
        countries_tab: '#subtab-AdminCountries',
        states_tab: '#subtab-AdminStates',
        taxes_submenu: '#subtab-AdminParentTaxes',
        taxe_rules_tab: '#subtab-AdminTaxRulesGroup',
        translations_submenu: '#subtab-AdminTranslations'
      }
    },
    Configure: {
      ShopParameters: {
        shop_parameters_menu: '#subtab-ShopParameters',
        general_submenu: '#subtab-AdminParentPreferences',
        maintenance_tab: '#subtab-AdminMaintenance',
        order_settings_submenu: '#subtab-AdminParentOrderPreferences',
        statuses_tab: '#subtab-AdminStatuses',
        product_settings_submenu: '#subtab-AdminPPreferences',
        customer_settings_submenu: '#subtab-AdminParentCustomerPreferences',
        groups_tab: '#subtab-AdminGroups',
        titles_tab: '#subtab-AdminGenders',
        contact_submenu: '#subtab-AdminParentStores',
        stores_tab: '#subtab-AdminStores',
        traffic_seo_submenu: '#subtab-AdminParentMeta',
        search_engines_tab: '#subtab-AdminSearchEngines',
        referrers_tab: '#subtab-AdminReferrers',
        search_submenu: '#subtab-AdminParentSearchConf',
        tags_tab: '#subtab-AdminTags',
        merchant_expertise_submenu: '#subtab-AdminGamification'
      },
      AdvancedParameters: {
        advanced_parameters_menu: '#subtab-AdminAdvancedParameters',
        information_submenu: '#subtab-AdminInformation',
        performance_submenu: '#subtab-AdminPerformance',
        administration_submenu: '#subtab-AdminAdminPreferences',
        email_submenu: '#subtab-AdminEmails',
        import_submenu: '#subtab-AdminImport',
        team_submenu: '#subtab-AdminParentEmployees',
        profiles_tab: '#subtab-AdminProfiles',
        permissions_tab: '#subtab-AdminAccess',
        database_submenu: '#subtab-AdminParentRequestSql',
        logs_submenu: '#subtab-AdminLogs',
        webservice_submenu: '#subtab-AdminWebservice',
        multistore_submenu: '#subtab-AdminShopGroup',
        db_backup_tab: '#subtab-AdminBackup',
      }
    }
  }
};
