import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Subject, Topic } from './tickets.model';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  // URL
  public ticketsURL: string = environment.baseUrl + 'v1/tickets/';
  public topicsURL: string = environment.baseUrl + 'v1/ticket-topics/';
  public subjectsURL: string = environment.baseUrl + 'v1/ticket-subjects/';
  
  // Data
  public ticket: any
  public tickets: any[] = []

  public topic: Topic
  public topics: Topic[] = []

  public subject: Subject
  public subjects: Subject[] = []

  constructor(private http: HttpClient) {}


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
    return this.http.get<Subject[]>(this.subjectsURL).pipe(
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
  
}
