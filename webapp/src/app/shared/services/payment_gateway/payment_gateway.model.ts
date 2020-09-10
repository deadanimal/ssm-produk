export class PaymentGateway {
  public id: string;
  public transaction_date: string;
  public transaction_id: string;
  public transaction_me: string;
  public customer_id: string;
  public customer_address: string;
  public product_type: string;
  public product_code: string;
  public gross_sale_amount: string;
  public tax_amount: string;
  public discount_charge: string;
  public net_amount: string;
  public transaction_status: string;
  public date_created: string;
  public date_modified: string;

  constructor(
    id: string,
    transaction_date: string,
    transaction_id: string,
    transaction_me: string,
    customer_id: string,
    customer_address: string,
    product_type: string,
    product_code: string,
    gross_sale_amount: string,
    tax_amount: string,
    discount_charge: string,
    net_amount: string,
    transaction_status: string,
    date_created: string,
    date_modified: string
  ) {
    this.id = id;
    this.transaction_date = transaction_date;
    this.transaction_id = transaction_id;
    this.transaction_me = transaction_me;
    this.customer_id = customer_id;
    this.customer_address = customer_address;
    this.product_type = product_type;
    this.product_code = product_code;
    this.gross_sale_amount = gross_sale_amount;
    this.tax_amount = tax_amount;
    this.discount_charge = discount_charge;
    this.net_amount = net_amount;
    this.transaction_status = transaction_status;
    this.date_created = date_created;
    this.date_modified = date_modified;
  }
}
