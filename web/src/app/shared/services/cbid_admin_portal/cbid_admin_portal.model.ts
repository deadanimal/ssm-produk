export class CbidAdminPortal {
  public id: string;
  public pending: string;
  public pending_date: string;
  public completed: string;
  public completed_date: string;
  public date_created: string;
  public date_modified: string;

  constructor(
    id: string,
    pending: string,
    pending_date: string,
    completed: string,
    completed_date: string,
    date_created: string,
    date_modified: string
  ) {
    this.id = id;
    this.pending = pending;
    this.pending_date = pending_date;
    this.completed = completed;
    this.completed_date = completed_date;
    this.date_created = date_created;
    this.date_modified = date_modified;
  }
}
