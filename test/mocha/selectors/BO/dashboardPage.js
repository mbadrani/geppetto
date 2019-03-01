module.exports = {
  Dashboard: {
    page_content: 'body',
    onbording_stop_button: '#nav-sidebar a.onboarding-button-stop',
    welcome_modal: 'div.onboarding-welcome i',
    multistore_shop_name: '#header_shop > li > a',
    click_all_shops: '#header_shop ul > li:nth-child(1) > a',

    UsefulLinks:{
      usefulLinksURL:'#dashboard dl:nth-child(%D) a',
      usefulLinksText:'#dashboard  section.dash_links.panel dl:nth-child(%D) dd'
    }
  }
};
