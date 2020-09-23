export class Ticket {
  public id: string;
  public title: string;
  public description: string;
  public ticket_type: string;
  public attached_document: string;
  public error_screenshot: string;
  public error_supporting_document: string;
  public error_product: string;
  public topic: string;
  public subject: string;
  public user: string;

  constructor(
    id: string,
    title: string,
    description: string,
    ticket_type: string,
    attached_document: string,
    error_screenshot: string,
    error_supporting_document: string,
    error_product: string,
    topic: string,
    subject: string,
    user: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.ticket_type = ticket_type;
    this.attached_document = attached_document;
    this.error_screenshot = error_screenshot;
    this.error_supporting_document = error_supporting_document;
    this.error_product = error_product;
    this.topic = topic;
    this.subject = subject;
    this.user = user;
  }
}
