export class Receipt {
  public id: string;
  public order_id: string;
  public transaction_id: string;
  public date: string;
  public time: string;
  public customer_id: string;
  public customer_address: string;
  public product_type: string;
  public product_code: string;
  public gross_amount: string;
  public tax_amount: string;
  public discount_charge: string;
  public net_amount: string;
  public ca_charge: string;
  public date_created: string;
  public date_modified: string;

  constructor(
    id: string,
    order_id: string,
    transaction_id: string,
    date: string,
    time: string,
    customer_id: string,
    customer_address: string,
    product_type: string,
    product_code: string,
    gross_amount: string,
    tax_amount: string,
    discount_charge: string,
    net_amount: string,
    ca_charge: string,
    date_created: string,
    date_modified: string
  ) {
    this.id = id;
    this.order_id = order_id;
    this.transaction_id = transaction_id;
    this.date = date;
    this.time = time;
    this.customer_id = customer_id;
    this.customer_address = customer_address;
    this.product_type = product_type;
    this.product_code = product_code;
    this.gross_amount = gross_amount;
    this.tax_amount = tax_amount;
    this.discount_charge = discount_charge;
    this.net_amount = net_amount;
    this.ca_charge = ca_charge;
    this.date_created = date_created;
    this.date_modified = date_modified;
  }
}
