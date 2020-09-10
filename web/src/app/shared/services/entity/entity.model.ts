export class Entity {
  public id: string;
  public entity_type: string;
  public product_type: string;
  public status: string;
  public requestor: string;
  public date_created: string;
  public date_modified: string;

  constructor(
    id: string,
    entity_type: string,
    product_type: string,
    status: string,
    requestor: string,
    date_created: string,
    date_modified: string
  ) {
    this.id = id;
    this.entity_type = entity_type;
    this.product_type = product_type;
    this.status = status;
    this.requestor = requestor;
    this.date_created = date_created;
    this.date_modified = date_modified;
  }
}
