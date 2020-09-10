export class FillForm {
  public id: string;
  public name: string;
  public organisation: string;
  public address: string;
  public email_address: string;
  public phone_number: string;
  public date_created: string;
  public date_modified: string;

  constructor(
    id: string,
    name: string,
    organisation: string,
    address: string,
    email_address: string,
    phone_number: string,
    date_created: string,
    date_modified: string
  ) {
    this.id = id;
    this.name = name;
    this.organisation = organisation;
    this.address = address;
    this.email_address = email_address;
    this.phone_number = phone_number;
    this.date_created = date_created;
    this.date_modified = date_modified;
  }
}
