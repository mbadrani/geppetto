module.exports = {
  OrderPage: {
    view_order_button: '#table-order tbody tr:nth-child(%D) td:nth-child(12) a',
    choose_order_status: '#id_order_state_chosen ',
    order_status: '#id_order_state_chosen li:nth-child(%D)',
    update_status_button: '#submit_state',
    check_order_status: '#status  tr:nth-child(%D) > td:nth-child(2)',
    new_order_button: '#page-header-desc-order-new_order',
  },
  CreateOrderPage: {
    customer_search_input: '#customer',
    choose_customer_button: '#choose_customer_btn',
    product_search_input: '#product',
    add_to_cart_button: '#submitAddProduct',
    create_order_button: '#order_submit_btn'
  }
};
