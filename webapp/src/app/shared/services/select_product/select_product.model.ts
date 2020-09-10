export class SelectProduct {
  public id: string;
  public statistic: string;
  public listing: string;
  public both: string;
  public product_id: string;
  public date_created: string;
  public date_modified: string;

  constructor(
    id: string,
    statistic: string,
    listing: string,
    both: string,
    product_id: string,
    date_created: string,
    date_modified: string
  ) {
    this.id = id;
    this.statistic = statistic;
    this.listing = listing;
    this.both = both;
    this.product_id = product_id;
    this.date_created = date_created;
    this.date_modified = date_modified;
  }
}
