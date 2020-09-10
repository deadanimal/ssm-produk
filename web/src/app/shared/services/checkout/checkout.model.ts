export class Checkout {
  public id: string;
  public name: string;
  public address: string;
  public email_address: string;
  public phone_number: string;
  public order_id: string;
  public product_id: string;
  public date_created: string;
  public date_modified: string;

  constructor(
    id: string,
    name: string,
    address: string,
    email_address: string,
    phone_number: string,
    order_id: string,
    product_id: string,
    date_created: string,
    date_modified: string
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.email_address = email_address;
    this.phone_number = phone_number;
    this.order_id = order_id;
    this.product_id = product_id;
    this.date_created = date_created;
    this.date_modified = date_modified;
  }
}
