export class Freeform {
  public id: string;
  public name: string;
  public value: string;
  public date_created: string;
  public date_modified: string;

  constructor(
    id: string,
    name: string,
    value: string,
    date_created: string,
    date_modified: string
  ) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.date_created = date_created;
    this.date_modified = date_modified;
  }
}
