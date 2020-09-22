import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { InvestigationTicket } from "./investigation-tickets.model";

@Injectable({
  providedIn: "root",
})
export class InvestigationTicketsService {
  // URL
  public urlInvestigationTicket: string =
    environment.baseUrl + "v1/investigation-tickets/";

  // Data
  public InvestigationTicket: InvestigationTicket;
  public InvestigationTickets: InvestigationTicket[] = [];
  public InvestigationTicketsFiltered: InvestigationTicket[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<InvestigationTicket> {
    return this.http.post<any>(this.urlInvestigationTicket, body).pipe(
      tap((res) => {
        console.log("InvestigationTicket: ", res);
      })
    );
  }

  getAll(): Observable<InvestigationTicket[]> {
    return this.http
      .get<InvestigationTicket[]>(this.urlInvestigationTicket)
      .pipe(
        tap((res) => {
          console.log("InvestigationTickets: ", res);
        })
      );
  }

  getOne(id: String): Observable<InvestigationTicket> {
    let urlInvestigationTicketOne = this.urlInvestigationTicket + id + "/";
    return this.http.get<InvestigationTicket>(urlInvestigationTicketOne).pipe(
      tap((res) => {
        console.log("InvestigationTicket: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<InvestigationTicket> {
    let urlInvestigationTicketOne = this.urlInvestigationTicket + id + "/";
    return this.http
      .put<InvestigationTicket>(urlInvestigationTicketOne, body)
      .pipe(
        tap((res) => {
          console.log("InvestigationTicket", res);
        })
      );
  }

  filter(field: String): Observable<InvestigationTicket[]> {
    let urlFilter = this.urlInvestigationTicket + "?" + field + "/";
    return this.http.get<InvestigationTicket[]>(urlFilter).pipe(
      tap((res) => {
        console.log("InvestigationTickets", res);
      })
    );
  }
}
