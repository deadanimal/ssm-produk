import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Note, Subject, Topic } from './tickets.model';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  // URL
  public ticketsURL: string = environment.baseUrl + 'v1/tickets/';
  public topicsURL: string = environment.baseUrl + 'v1/ticket-topics/';
  public subjectsURL: string = environment.baseUrl + 'v1/ticket-subjects/';
  public notesURL: string = environment.baseUrl + 'v1/enquiry-notes/'
  public replyURL: string = environment.baseUrl + 'v1/enquiry-ticket-replies/'
  
  // Data
  public ticket: any
  public tickets: any[] = []

  public topic: Topic
  public topics: Topic[] = []

  public subject: Subject
  public subjects: Subject[] = []

  public note: Note
  public notes: Note[] = []

  public reply: any
  public replies: any[] = []

  constructor(private http: HttpClient) {}

  // Tickets
  getTickets(): Observable<any> {
    let urlTemp = this.ticketsURL + 'extended/' + '?ordering=-created_date'
    return this.http.get<any>(urlTemp).pipe(
      tap((res) => {
        // console.log('Topics: ', res)
        this.tickets = res
      })
    )
  }

  createReply(body: any): Observable<any> {
    let urlTemp = this.replyURL + 'create_reply/'
    return this.http.post<any>(urlTemp, body).pipe(
      tap((res) => {
        // console.log('Topics: ', res)
        this.reply = res
      })
    )
  }

  updateStatus(body: any): Observable<any> {
    let urlTemp = this.ticketsURL
    if (body['type'] == 'IQ') {
      urlTemp = urlTemp + body['ticket'] + '/status_ip_required/'
    }
    else if (body['type'] == 'IC') {
      urlTemp = urlTemp + body['ticket'] + '/status_ip_received/'
    }
    else if (body['type'] == 'EC') {
      urlTemp = urlTemp + body['ticket'] + '/status_escalated/'
    }
    else if (body['type'] == 'CA') {
      urlTemp = urlTemp + body['ticket'] + '/status_closed_assigned/'
    }
    else if (body['type'] == 'CR') {
      urlTemp = urlTemp + body['ticket'] + '/status_closed_not_related/'
    }
    else if (body['type'] == 'CD') {
      urlTemp = urlTemp + body['ticket'] + '/status_closed_not_responded/'
    }
    else if (body['type'] == 'CA') {
      urlTemp = urlTemp + body['ticket'] + '/status_closed_resolved/'
    }
    else if (body['type'] == 'CL') {
      urlTemp = urlTemp + body['ticket'] + '/status_closed/'
    } 
    else if (body['type'] == 'CO') {
      urlTemp = urlTemp + body['ticket'] + '/status_closed_resolved/'
    }
    else if (body['type'] == 'AS') {
      urlTemp = urlTemp + body['ticket'] + '/status_assign/'
    }
    return this.http.post<any>(urlTemp, body).pipe(
      tap((res) => {
        // console.log('Topics: ', res)
        this.reply = res
      })
    )
  }

  // Ticket topic
  createTopic(body: any): Observable<any> {
    return this.http.post<any>(this.topicsURL, body).pipe(
      tap((res: Topic) => {
        // console.log('Created: ', res);
        this.topic = res
      })
    );  
  }
  
  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.topicsURL).pipe(
      tap((res: Topic[]) => {
        // console.log('Topics: ', res)
        this.topics = res
      })
    )
  }

  getTopic(id: any): Observable<Topic> {
    let urlTemp = this.topicsURL + id + '/'
    return this.http.get<any>(urlTemp).pipe(
      tap((res: Topic) => {
        // console.log('Topics: ', res)
        this.topic = res
      })
    )
  }

  patchTopic(id: any, body: any): any {
    let urlTemp = this.topicsURL + id + '/';
    return this.http.patch(urlTemp, body).pipe(
      tap((res: Topic) => {
        // console.log('Patch: ', res);
        this.topic = res
      })
    );        
  }

  // Ticket subjects
  createSubject(body: any): Observable<Subject> {
    return this.http.post<Subject>(this.subjectsURL, body).pipe(
      tap((res: Subject) => {
        // console.log('Patch: ', res);
        this.subject = res
      })
    );  
  }

  getSubjects(): Observable<Subject[]> {
    let urlTemp = this.subjectsURL + 'extended/'
    return this.http.get<Subject[]>(urlTemp).pipe(
      tap((res: Subject[]) => {
        // console.log('Subjects: ', res)
        this.subjects = res
      })
    )
  }

  getSubject(id: any): Observable<Subject> {
    let urlTemp = this.subjectsURL + id + '/'
    return this.http.get<Subject>(urlTemp).pipe(
      tap((res: Subject) => {
        // console.log('Topics: ', res)
        this.subject = res
      })
    )
  }

  patchSubject(id: any, body: any): Observable<Subject> {
    let urlTemp = this.subjectsURL + id + '/'
    return this.http.patch(urlTemp, body).pipe(
      tap((res: Subject) => {
        // console.log('Patch: ', res);
        this.subject = res
      })
    );        
  }

  // Ticket notes
  createNote(body: any): Observable<Note> {
    return this.http.post<Note>(this.subjectsURL, body).pipe(
      tap((res: Note) => {
        // console.log('Patch: ', res);
        this.note = res
      })
    );  
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesURL).pipe(
      tap((res: Note[]) => {
        // console.log('Notes: ', res)
        this.notes = res
      })
    )
  }

  getNote(id: any): Observable<Note> {
    let urlTemp = this.notesURL + id + '/'
    return this.http.get<Note>(urlTemp).pipe(
      tap((res: Note) => {
        // console.log('Topics: ', res)
        this.note = res
      })
    )
  }

  patchNote(id: any, body: any): Observable<Note> {
    let urlTemp = this.notesURL + id + '/'
    return this.http.patch(urlTemp, body).pipe(
      tap((res: Note) => {
        // console.log('Patch: ', res);
        this.note = res
      })
    );        
  }
  
}
