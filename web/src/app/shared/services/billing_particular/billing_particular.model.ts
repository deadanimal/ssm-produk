export class BillingParticular {
  public id: string;
  public name: string;
  public email_address: string;
  public phone_number: string;
  public address1: string;
  public address2: string;
  public address3: string;
  public postcode: string;
  public city: string;
  public state: string;
  public date_created: string;
  public date_modified: string;

  constructor(
    id: string,
    name: string,
    email_address: string,
    phone_number: string,
    address1: string,
    address2: string,
    address3: string,
    postcode: string,
    city: string,
    state: string,
    date_created: string,
    date_modified: string
  ) {
    this.id = id;
    this.name = name;
    this.email_address = email_address;
    this.phone_number = phone_number;
    this.address1 = address1;
    this.address2 = address2;
    this.address3 = address3;
    this.postcode = postcode;
    this.city = city;
    this.state = state;
    this.date_created = date_created;
    this.date_modified = date_modified;
  }
}
