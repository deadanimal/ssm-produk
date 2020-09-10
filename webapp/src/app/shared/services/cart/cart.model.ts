export class Cart {
  public id: string;
  public product_details: string;
  public search_criteria: string;
  public total_page: string;
  public total_company: string;
  public unit_price: string;
  public total_price: string;
  public total: string;
  public sst: string;
  public total_amount: string;
  public date_created: string;
  public date_modified: string;

  constructor(
    id: string,
    product_details: string,
    search_criteria: string,
    total_page: string,
    total_company: string,
    unit_price: string,
    total_price: string,
    total: string,
    sst: string,
    total_amount: string,
    date_created: string,
    date_modified: string
  ) {
    this.id = id;
    this.product_details = product_details;
    this.search_criteria = search_criteria;
    this.total_page = total_page;
    this.total_company = total_company;
    this.unit_price = unit_price;
    this.total_price = total_price;
    this.total = total;
    this.sst = sst;
    this.total_amount = total_amount;
    this.date_created = date_created;
    this.date_modified = date_modified;
  }
}
