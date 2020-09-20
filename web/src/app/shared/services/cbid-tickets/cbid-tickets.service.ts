import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { CbidTicket } from "./cbid-tickets.model";

@Injectable({
  providedIn: "root",
})
export class CbidTicketsService {
  // URL
  public urlCbidTicket: string = environment.baseUrl + "v1/cbid-tickets/";

  // Data
  public CbidTicket: CbidTicket;
  public CbidTickets: CbidTicket[] = [];
  public CbidTicketsFiltered: CbidTicket[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<CbidTicket> {
    return this.http.post<any>(this.urlCbidTicket, body).pipe(
      tap((res) => {
        console.log("CbidTicket: ", res);
      })
    );
  }

  getAll(): Observable<CbidTicket[]> {
    return this.http.get<CbidTicket[]>(this.urlCbidTicket).pipe(
      tap((res) => {
        console.log("CbidTickets: ", res);
      })
    );
  }

  getOne(id: String): Observable<CbidTicket> {
    let urlCbidTicketOne = this.urlCbidTicket + id + "/";
    return this.http.get<CbidTicket>(urlCbidTicketOne).pipe(
      tap((res) => {
        console.log("CbidTicket: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<CbidTicket> {
    let urlCbidTicketOne = this.urlCbidTicket + id + "/";
    return this.http.put<CbidTicket>(urlCbidTicketOne, body).pipe(
      tap((res) => {
        console.log("CbidTicket", res);
      })
    );
  }

  filter(field: String): Observable<CbidTicket[]> {
    let urlFilter = this.urlCbidTicket + "?" + field + "/";
    return this.http.get<CbidTicket[]>(urlFilter).pipe(
      tap((res) => {
        console.log("CbidTickets", res);
      })
    );
  }

  delete(id: String): Observable<CbidTicket[]> {
    let urlFilter = this.urlCbidTicket + id;
    return this.http.delete<CbidTicket[]>(urlFilter).pipe(
      tap((res) => {
        console.log("CbidTickets", res);
      })
    );
  }
}
