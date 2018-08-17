module.exports = {
  TaxesPage: {
    filter_search_button: '#submitFilterButtontax',
    tax_number_span: '#form-tax span.badge',
    taxes_table: '#table-tax',
    get tax_name() {
      return this.taxes_table + ' > tbody tr:nth-child(%S) > td:nth-child(3)';
    },
    get tax_rate() {
      return this.taxes_table + ' > tbody tr:nth-child(%S) > td:nth-child(4)';
    },
    get filter_name_input() {
      return this.taxes_table + ' input.filter[name="taxFilter_name"]';
    }
  }
};