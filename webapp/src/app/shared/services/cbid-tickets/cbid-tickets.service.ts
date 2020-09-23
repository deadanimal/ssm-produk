import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CBIDTicket } from './cbid-tickets.model';

@Injectable({
  providedIn: 'root'
})
export class CbidTicketsService {

  // URL
  public urlTicket: string = environment.baseUrl + 'v1/cbid-tickets/'
  public urlTicketExtended: string = environment.baseUrl + 'v1/cbid-tickets/extended/'
  
  // Data
  public ticket: CBIDTicket
  public tickets: CBIDTicket[] = []
  public ticketsExtended: CBIDTicket[] = []

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<CBIDTicket[]> {
    return this.http.get<CBIDTicket[]>(this.urlTicket).pipe(
      tap((res) => {
        this.tickets = res
        console.log('Tickets: ', res)
      })
    )
  }

  getAllExtended(): Observable<CBIDTicket[]> {
    return this.http.get<CBIDTicket[]>(this.urlTicketExtended).pipe(
      tap((res) => {
        this.ticketsExtended = res
        console.log('Tickets: ', res)
      })
    )
  }

  patch(id: string, body: Form): Observable<any> {
    let urlTemp = this.urlTicket + id +'/'
    return this.http.patch<any>(urlTemp, body).pipe(
      tap((res) => {
        console.log(res)
      })
    )
  }

}
