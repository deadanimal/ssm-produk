import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Ticket } from './ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  // URL
  public urlTicket: string = environment.baseUrl + 'v1/tickets/';
  public urlNote: string = environment.baseUrl + 'v1/enquiry-notes/';
  public urlTopic: string = environment.baseUrl + 'v1/ticket-topics/';
  public urlSubject: string = environment.baseUrl + 'v1/ticket-subjects/';

  // Data
  public Ticket: any;
  public Tickets: any[] = [];
  public TicketsFiltered: any[] = [];

  public note: any
  public notes: any[] = []

  public topic: any
  public topics: any[] = []

  public subject: any
  public subjects: any[] = []

  constructor(private http: HttpClient) {}

  // Ticket
  create(body: Form): Observable<any> {
    let urlTemp = this.urlTicket + 'create_ticket/'
    return this.http.post<any>(urlTemp, body).pipe(
      tap((res) => {
        console.log('Ticket: ', res);
      })
    );
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.urlTicket).pipe(
      tap((res) => {
        console.log('Tickets: ', res);
      })
    );
  }

  getOne(id: String): Observable<any> {
    let urlTicketOne = this.urlTicket + id + '/';
    return this.http.get<any>(urlTicketOne).pipe(
      tap((res) => {
        console.log('Ticket: ', res);
      })
    );
  }

  update(id: String, body: Form): Observable<any> {
    let urlTicketOne = this.urlTicket + id + '/';
    return this.http.put<any>(urlTicketOne, body).pipe(
      tap((res) => {
        console.log('Ticket', res);
      })
    );
  }

  filter(field: String): Observable<any[]> {
    let urlFilter = this.urlTicket + '?' + field + '/';
    return this.http.get<any[]>(urlFilter).pipe(
      tap((res) => {
        console.log('Tickets', res);
      })
    );
  }
  
  // Notes
  getNotes(): Observable<any[]> {
    return this.http.get<any[]>(this.urlNote).pipe(
      tap((res) => {
        console.log('Notes: ', res);
        this.notes = res
      })
    );
  }

  // Topics
  getTopics(): Observable<any[]> {
    return this.http.get<any[]>(this.urlTopic).pipe(
      tap((res) => {
        console.log('Topics: ', res);
        this.topics = res
      })
    );
  }

  // Subjects
  getSubjects(): Observable<any[]> {
    return this.http.get<any[]>(this.urlSubject).pipe(
      tap((res) => {
        console.log('Subjects: ', res);
        this.subjects = res
      })
    );
  }
}
