export class InvestigationTicket {
  public id: string;
  public reference_letter_number: string;
  public ip_no: string;
  public court_case_number: string;
  public official_attachment: string;
  public offense: string;
  public document_request: string;
  public submit_request: string;
  public officer: string;
  public date_created: string;
  public date_modified: string;

  constructor(
    id: string,
    reference_letter_number: string,
    ip_no: string,
    court_case_number: string,
    official_attachment: string,
    offense: string,
    document_request: string,
    submit_request: string,
    officer: string,
    date_created: string,
    date_modified: string
  ) {
    this.id = id;
    this.reference_letter_number = reference_letter_number;
    this.ip_no = ip_no;
    this.court_case_number = court_case_number;
    this.official_attachment = official_attachment;
    this.offense = offense;
    this.document_request = document_request;
    this.submit_request = submit_request;
    this.officer = officer;
    this.date_created = date_created;
    this.date_modified = date_modified;
  }
}
