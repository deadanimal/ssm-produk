export class Transaction {
  public id: string;
  public name: string;
  // public transaction_id: string;
  // public date: string;
  // public time: string;
  // public customer_id: string;
  // public customer_address: string;
  // public product_type: string;
  // public product_code: string;
  // public gross_amount: string;
  // public tax_amount: string;
  // public discount_charge: string;
  // public net_amount: string;
  // public ca_charge: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name: string,
    // transaction_id: string,
    // date: string,
    // time: string,
    // customer_id: string,
    // customer_address: string,
    // product_type: string,
    // product_code: string,
    // gross_amount: string,
    // tax_amount: string,
    // discount_charge: string,
    // net_amount: string,
    // ca_charge: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name = name;
    // this.transaction_id = transaction_id;
    // this.date = date;
    // this.time = time;
    // this.customer_id = customer_id;
    // this.customer_address = customer_address;
    // this.product_type = product_type;
    // this.product_code = product_code;
    // this.gross_amount = gross_amount;
    // this.tax_amount = tax_amount;
    // this.discount_charge = discount_charge;
    // this.net_amount = net_amount;
    // this.ca_charge = ca_charge;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
