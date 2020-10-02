import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Notification } from './notifications.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  // URL
  public urlNotifications: string = environment.baseUrl + 'v1/notifications/';

  // Data
  public notification: Notification;
  public notifications: Notification[] = [];
  public notificationsFiltered: Notification[] = [];

  constructor(private http: HttpClient) {}

  getAll(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.urlNotifications).pipe(
      tap((respond: any) => {
        this.notifications = respond
        console.log('Notifications: ', respond);
      })
    );
  }

  getOne(id: String): Observable<Notification> {
    let urlTemp = this.urlNotifications + id + '/';
    return this.http.get<Notification>(urlTemp).pipe(
      tap((respond: any) => {
        this.notification = respond
        console.log('Notification: ', this.notification);
      })
    );
  }

  
  /*filter(field: String): Observable<Notification[]> {
    let urlTemp = this.urlNotifications + '?' + field + '/';
    return this.http.get<Notification[]>(urlTemp).pipe(
      tap((respond: any) => {
        this.notificationsFiltered = res
        console.log('Notifications filtered: ', this.notificationsFiltered);
      })
    );
  }*/

}
