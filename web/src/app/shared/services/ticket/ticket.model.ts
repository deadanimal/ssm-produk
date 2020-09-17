export class Ticket {
  public id: string;
  public title: string;
  public description: string;
  public topic_type: string;
  public attached_document: string;
  public error_screenshot: string;
  public error_supporting_document: string;
  public error_product: string;
  public product: string;
  public user: string;

  constructor(
    id: string,
    title: string,
    description: string,
    topic_type: string,
    attached_document: string,
    error_screenshot: string,
    error_supporting_document: string,
    error_product: string,
    product: string,
    user: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.topic_type = topic_type;
    this.attached_document = attached_document;
    this.error_screenshot = error_screenshot;
    this.error_supporting_document = error_supporting_document;
    this.error_product = error_product;
    this.product = product;
    this.user = user;
  }
}
